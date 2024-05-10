const Salon = require("../Models/Salonmodel"); // Assuming you have a Salon model defined

const multer = require('multer');
const path = require('path')

module.exports.createSalon = async (req, res) => {
  try {
    const { 
            name,
            images, 
            address, 
            services, 
            contact,
            city
          } = req.body;

    const newSalon = new Salon({
      name,
      images,
      address,
      services,
      contact,
      city
    });

    // Save the new salon document
    await newSalon.save();

    await newSalon.populate('services');
    await newSalon.populate('city');
  // Send a single response to the client
    res.status(200).json(newSalon);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateSalon = async (req, res) => {
  const updateId = req.params.id; // Use req.params.id to get the update ID
  try {
  
    // Find the salon by its ID and update properties based on the request body
    const updatedSalon = await Salon.findByIdAndUpdate(
      updateId,
      { $set: req.body }, // Assuming req.body contains the updated properties
      { new: true } // To return the updated document
    );

    if (!updatedSalon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Send a single response to the client with the updated salon
    res.status(200).json(updatedSalon);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteSalon = async (req, res) => {
  const deleteId = req.params.id; // Use req.params.id to get the delete ID
  
  

  try {
   
    // Find the salon by its ID and delete it
    const deletedSalon = await Salon.findByIdAndDelete(deleteId);

    if (!deletedSalon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("Deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSalonById = async (req, res) => {
  const getId = req.params.id; // Use req.params.id to get the salon ID
  

  try {
  
    const newSalon = await Salon.findById(getId).populate([
      { path: 'services', select: '-_id' },
      { path: 'city', select: '-_id' }
  ]);

    if (!newSalon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Send a single response to the client with the retrieved salon
    res.status(200).json(newSalon);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllSalons = async (req, res) => {
 
  try {

    const newSalon = await Salon.find().populate({
      path: 'services',
      select: '-_id' // Exclude the _id field from services
    }).populate({
      path: 'city',
      select: '-_id' // Exclude the _id field from city
    });
    // Find all salons
    res.status(200).json(newSalon);


  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};


module.exports.salonUploadImages = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/salonImageUpload/Image');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/salonImageUpload/Image/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('salon_image');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ salon: UploadedfileName }); // Send a JSON response
      });
  }
  catch (error) {
      res.status(500).json({ error: "Error salon Image Upload" + error });
  }
};

module.exports.salonuploadmultipleimage = async (req, res, next) => {
try {
    let uploadedFileNames = [];
    const filePath = path.join(__dirname + '/salonImageUpload/Images');
    
    const storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const fileExtension = path.extname(originalname);
            const uniqueSuffix = Date.now();
            const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension;
            const uploadedFileNameWithPath = '/salonImageUpload/Images/' + newFilename;
            uploadedFileNames.push(uploadedFileNameWithPath);
            cb(null, newFilename);
        }
    });

    const upload = multer({ storage: storage }).array('salon_image', 6); // 'images' is the field name in your form, and 5 is the maximum number of files allowed

    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).send('Error uploading files.' + err);
        }
        res.json({ images: uploadedFileNames });
    });
} catch (error) {
    res.status(500).json({ error: "Error uploading images" + error });
}
};