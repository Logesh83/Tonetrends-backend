const City = require("../Models/Citymodels"); // Assuming you have a City model defined

const multer = require('multer');
const path = require('path')

module.exports.createCity = async (req, res) => {
  try {
    const { 
            name, 
            areas 
          } = req.body;

    const newCity = new City({
      name,
      areas,
    });

    // Save the new city document
    await newCity.save();

   
    // Send a single response to the client
    res.status(200).json(newCity);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCity = async (req, res) => {
  const updateId = req.params.id; // Use req.params.id to get the update ID

  try {
    // Find the city by its ID and update properties based on the request body
    const updatedCity = await City.findByIdAndUpdate(
      updateId,
      { $set: req.body }, // Assuming req.body contains the updated properties
      { new: true } // To return the updated document
    );

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Send a single response to the client with the updated city
    res.status(200).json(updatedCity);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCity = async (req, res) => {
  const deleteId = req.params.id; // Use req.params.id to get the delete ID

  try {
    // Find the city by its ID and delete it
    const deletedCity = await City.findByIdAndDelete(deleteId);

    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("Deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCityById = async (req, res) => {
  const getId = req.params.id; // Use req.params.id to get the city ID

  try {
    // Find the city by its ID
    const city = await City.findById(getId);

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Send a single response to the client with the retrieved city
    res.status(200).json(city);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllCities = async (req, res) => {
  try {
    // Find all cities
    const cities = await City.find();
    res.status(200).json(cities);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.cityUploadImages = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/cityImageUpload/Image');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/cityImageUpload/Image/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('city_image');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ city: UploadedfileName }); // Send a JSON response
      });
  }
  catch (error) {
      res.status(500).json({ error: "Error city Image Upload" + error });
  }
};

module.exports.cityuploadmultipleimage = async (req, res, next) => {
try {
    let uploadedFileNames = [];
    const filePath = path.join(__dirname + '/cityImageUpload/Images');
    
    const storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const fileExtension = path.extname(originalname);
            const uniqueSuffix = Date.now();
            const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension;
            const uploadedFileNameWithPath = '/cityImageUpload/Images/' + newFilename;
            uploadedFileNames.push(uploadedFileNameWithPath);
            cb(null, newFilename);
        }
    });

    const upload = multer({ storage: storage }).array('city_image', 6); // 'images' is the field name in your form, and 5 is the maximum number of files allowed

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