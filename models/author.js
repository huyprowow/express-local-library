var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },//kieu string,bat buoc,chiu dai toi da 100kt
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//Virtual ho ten tac gia
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

//Virtual tuoi tho tac gia
AuthorSchema.virtual("lifespan").get(function () {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
});

//Virtual cho url tac gia
AuthorSchema.virtual("url").get(function (){
    return '/catalog/author/'+this._id;
});

//xuat model
module.exports =mongoose.model('Author',AuthorSchema); 