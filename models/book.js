var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true }, ///thao chieu den dtuong model Author duy nhat,bat buoc
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }], //tham chieu den mang dtuong model the loai
});

//Virtual cho book url
BookSchema.virtual('url').get(function(){
    return '/catalog/book/'+this._id;
})

module.exports = mongoose.model("Book", BookSchema);