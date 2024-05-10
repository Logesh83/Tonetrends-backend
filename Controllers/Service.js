const Service = require("../models/Servicemodels"); // Assuming you have a Service model defined

const multer = require('multer');
const path = require('path')

// Controller function to create a new service
module.exports.createService = async (req, res) => {
  try {
    const { 
            name, 
            description, 
            category, 
            price, 
            durationMinutes ,
            image
          } = req.body;

    // Create a new service object with the provided data
    const newService = new Service({
      name,
      description,
      category,
      price,
      durationMinutes,
      image
    });

    // Save the new service document to the database
    await newService.save();

    // Send a response with the newly created service
    res.status(201).json(newService);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update an existing service
module.exports.updateService = async (req, res) => {
  const serviceId = req.params.id; // Get the service ID from request parameters

  try {
    // Find the service by its ID and update its properties with the data from the request body
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send a response with the updated service
    res.status(200).json(updatedService);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete an existing service
module.exports.deleteService = async (req, res) => {
  const serviceId = req.params.id; // Get the service ID from request parameters

  try {
    // Find the service by its ID and delete it
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send a success message after deletion
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single service by its ID
module.exports.getServiceById = async (req, res) => {
  const serviceId = req.params.id; // Get the service ID from request parameters

  try {
    // Find the service by its ID
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send a response with the retrieved service
    res.status(200).json(service);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all services
module.exports.getAllServices = async (req, res) => {
  try {
    // Find all services
    const services = await Service.find();

    // Send a response with all services
    res.status(200).json(services);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};


module.exports.serviceUploadImages = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/serviceImageUpload/Image');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/serviceImageUpload/Image/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('service_image');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ service: UploadedfileName }); // Send a JSON response
      });
  }
  catch (error) {
      res.status(500).json({ error: "Error service Image Upload" + error });
  }
};

module.exports.serviceuploadmultipleimage = async (req, res, next) => {
try {
    let uploadedFileNames = [];
    const filePath = path.join(__dirname + '/serviceImageUpload/Images');
    
    const storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const fileExtension = path.extname(originalname);
            const uniqueSuffix = Date.now();
            const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension;
            const uploadedFileNameWithPath = '/serviceImageUpload/Images/' + newFilename;
            uploadedFileNames.push(uploadedFileNameWithPath);
            cb(null, newFilename);
        }
    });

    const upload = multer({ storage: storage }).array('service_image', 6); // 'images' is the field name in your form, and 5 is the maximum number of files allowed

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