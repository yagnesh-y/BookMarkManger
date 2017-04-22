var mongoose = require('mongoose');

var BookmarkSchema =  new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        default:''
    },
    profile: {
        type: String,
        trim: true,
        default:''
    },
    url: {
        type: String,
        trim: true,
        default:''
    },
    description: {
        type: String,
        trim: true,
        default:''
    },
    image: {
        type: String,
        trim: true,
        default:''
    },
    timestamp: {
        type: Date,
        default:Date.now
    }
});

BookmarkSchema.methods.summary = function(params) {
  //var keys= ['profile', 'title', 'description', 'image', 'timestamp', '_id']
  var summary = {
      title: this.title,
      url : this.url,
      image: this.image,
      description: this.description,
      timestamp: this.timestamp,
      id: this._id.toString()
  }
  return summary
}

module.exports = mongoose.model('BookmarkSchema', BookmarkSchema);