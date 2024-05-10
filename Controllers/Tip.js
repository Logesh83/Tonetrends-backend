const Tip = require('../models/Tipmodels'); // Assuming you have a Tip model defined

const multer = require('multer');
const path = require('path')

// Controller function to create a new tip
module.exports.createTip = async (req, res) => {
  try {
    const { 
            beautyTips, 
            description1, 
            fitnessTips, 
            description2 
          } = req.body;

    // Create a new Tip object with the provided data
    const newTip = new Tip({
      beautyTips,
      description1,
      fitnessTips,
      description2,
    });

    // Save the new Tip document to the database
    await newTip.save();

    // Send a response with the newly created Tip
    res.status(201).json(newTip);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update an existing tip
module.exports.updateTip = async (req, res) => {
  const tipId = req.params.id; // Get the tip ID from request parameters

  try {
    // Find the tip by its ID and update its properties with the data from the request body
    const updatedTip = await Tip.findByIdAndUpdate(
      tipId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    // Send a response with the updated tip
    res.status(200).json(updatedTip);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete an existing tip
module.exports.deleteTip = async (req, res) => {
  const tipId = req.params.id; // Get the tip ID from request parameters

  try {
    // Find the tip by its ID and delete it
    const deletedTip = await Tip.findByIdAndDelete(tipId);

    if (!deletedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    // Send a success message after deletion
    res.status(200).json({ message: 'Tip deleted successfully' });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single tip by its ID
module.exports.getTipById = async (req, res) => {
  const tipId = req.params.id; // Get the tip ID from request parameters

  try {
    // Find the tip by its ID
    const tip = await Tip.findById(tipId);

    if (!tip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    // Send a response with the retrieved tip
    res.status(200).json(tip);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all tips
module.exports.getAllTips = async (req, res) => {
  try {
    // Find all tips
    const tips = await Tip.find();

    // Send a response with all tips
    res.status(200).json(tips);
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ message: error.message });
  }
};


module.exports.tipUploadImages = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/tipImageUpload/Image');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/tipImageUpload/Image/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('tip_image');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ tip: UploadedfileName }); // Send a JSON response
      });
  }
  catch (error) {
      res.status(500).json({ error: "Error tip Image Upload" + error });
  }
};

module.exports.tipuploadmultipleimage = async (req, res, next) => {
try {
    let uploadedFileNames = [];
    const filePath = path.join(__dirname + '/tipImageUpload/Images');
    
    const storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const fileExtension = path.extname(originalname);
            const uniqueSuffix = Date.now();
            const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension;
            const uploadedFileNameWithPath = '/tipImageUpload/Images/' + newFilename;
            uploadedFileNames.push(uploadedFileNameWithPath);
            cb(null, newFilename);
        }
    });

    const upload = multer({ storage: storage }).array('tip_image', 6); // 'images' is the field name in your form, and 5 is the maximum number of files allowed

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