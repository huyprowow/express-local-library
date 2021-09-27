var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, //tc->sach dc lk
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"], //cac trang thai sach san co keu enum tranh sai chinh ta,gt tuy y cho tt
    default: "Maintenance", //tt mac dinh
  },
  due_back: { type: Date, default: Date.now }, //dat ngay due back md la bay h
});

//Virtual cho book url
BookInstanceSchema.virtual("url").get(function () {
  return "/catalog/bookinstance/" + this._id;
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
