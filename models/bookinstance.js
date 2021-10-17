//npm install luxon
//de dinh dang ngay thang
const { DateTime } = require("luxon");

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

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
