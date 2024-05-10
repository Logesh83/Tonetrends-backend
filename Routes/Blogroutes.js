const Route=require("express");
const { getAllBlogPosts, createBlog, updateBlog, deleteBlog, getBlogById , blogUploadImages ,bloguploadmultipleimage} = require("../Controllers/Blog");
const router = Route();

router.post("/createblog",createBlog);
router.post("/updateblog/:id",updateBlog);
router.post("/deleteblog/:id",deleteBlog);

router.post("/blogUploadImages",blogUploadImages);
router.post("/blogUploadmultipleImages",bloguploadmultipleimage);


router.get("/allblogpost/blog",getAllBlogPosts);
router.get("/getbyid/blog/:id",getBlogById);




module.exports=router;