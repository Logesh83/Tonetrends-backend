const mongoose=require('mongoose');
const { Schema }=require('mongoose');

const BlogPostSchema = new Schema({
    heading: { type: String  },
    description: { type: String  },
    image: { type: String}, // URL of the blog post image
    likes: { type: Number, default: 0 }, // Number of likes for the blog post
    shares: { type: Number, default: 0 }, // Number of shares for the blog post
    tip:{ type: mongoose.Schema.Types.ObjectId, ref: 'Tip'},
   });
   
module.exports=mongoose.model("Blog",BlogPostSchema)  