var Author = require("../models/author");

//ht danh sach tat ca cac tac gia
exports.author_list = function (req, res) {
  //xu li xong req =>k co ham next
  res.send("NOT IMPLEMENT : Author list");
};

//ht trang chi tiet cho 1 tac gia cu the
exports.author_detail = function (req, res) {
  res.send("NOT IMPLEMENT : Author detail " + req.params.id);
};

//ht tao bieu mau tac gia tren GET
exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENT : Author create GET");
};

//xu li tao tac gia tren post
exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENT : Author create POST");
};

//ht xoa bieu mau tac gia tren get
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENT : Author delete GET");
};

//xu li xoa tac gia tren post
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENT : Author delete POST");
};

//xu li cap nhap bieu mau tac gia tren get
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENT : Author update GET");
};

//xu li  cap nhap tac gia tren post
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENT : Author update POST");
};
