const Blog = require("../Models/Blogmodels");
const multer = require('multer');
const path = require('path');

// Create a directory if it doesn't exist
module.exports.blogUploadImages = async (req, res ,next) => {
  try {
      let UploadedfileName = '';
      const filePath = path.join(__dirname + '/blogImageUpload/Image');
      const Storage = multer.diskStorage({
          destination: filePath,
          filename: (req, file, cb) => {
              const originalname = file.originalname;
              const fileExtension = path.extname(originalname); // Get the file extension
              const uniqueSuffix = Date.now(); // Generate a unique suffix
              const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension; // Construct the new filename
              UploadedfileName = '/blogImageUpload/Image/' + newFilename;
              cb(null, newFilename);
          }
      });

      const upload = multer({ storage: Storage }).single('blog_image');
      upload(req, res, async function (err) {
          if (err) {
              // Handle upload error
              return res.status(500).send('Error uploading file.' + err);
          }
          res.json({ blog: UploadedfileName }); // Send a JSON response
      });
  }
  catch (error) {
      res.status(500).json({ error: "Error blog Image Upload" + error });
  }
};

module.exports.bloguploadmultipleimage = async (req, res, next) => {
try {
    let uploadedFileNames = [];
    const filePath = path.join(__dirname + '/blogImageUpload/Images');
    
    const storage = multer.diskStorage({
        destination: filePath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            const fileExtension = path.extname(originalname);
            const uniqueSuffix = Date.now();
            const newFilename = path.basename(originalname, fileExtension) + '_' + uniqueSuffix + fileExtension;
            const uploadedFileNameWithPath = '/blogImageUpload/Images/' + newFilename;
            uploadedFileNames.push(uploadedFileNameWithPath);
            cb(null, newFilename);
        }
    });

    const upload = multer({ storage: storage }).array('blog_image', 6); // 'images' is the field name in your form, and 5 is the maximum number of files allowed

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

module.exports.createBlog = async (req, res) => {
  try {
    const {
      heading,
      description,
      image,
      likes,
      shares,
      tip,
    } = req.body;

    const newBlog = new Blog({
      heading,
      description,
      image,
      likes,
      shares,
      tip,
    });

    // Save the new blog document
    await newBlog.save();

    // Populate the 'category' field
    await newBlog.populate('tip');

    // Send a single response to the client
    res.status(200).json(newBlog);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateBlog = async (req, res) => {
  const updateId = req.params.id; // Use req.params.id to get the update ID

  try {
    // Find the blog post by its ID and update properties based on the request body
    const updatedBlog = await Blog.findByIdAndUpdate(
      updateId,
      { $set: req.body }, // Assuming req.body contains the updated properties
      { new: true } // To return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Send a single response to the client with the updated blog post
    res.status(200).json(updatedBlog);

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteBlog = async (req, res) => {
  const deleteId = req.params.id; // Use req.params.id to get the update ID

  try {
    // Find the blog post by its ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(deleteId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Send a single response to the client indicating successful deletion
    res.status(200).json("Deleted successfully");

  } catch (error) {
    // Handle errors and send a single response to the client
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBlogById = async (req, res) => {
  const getId = req.params.id; // Use req.params.id to get the update ID

  try {
    // Find the blog post by its ID
    const blogPost = await Blog.findById(getId).populate({path:'tip', select:'-_id'});

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Send a single response to the client with the retrieved blog post
    res.status(200).json(blogPost);

  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllBlogPosts = async (req, res) => {

  try {
  
    const blogPosts = await Blog.find().populate({path:'tip', select:'-_id'});
    res.status(200).json(blogPosts);
    
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};