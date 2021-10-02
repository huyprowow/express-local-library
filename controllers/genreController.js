var Genre = require("../models/genre");

//ht danh sach tat ca cac the loai
exports.genre_list = function (req, res) {
  //xu li xong req =>k co ham next
  res.send("NOT IMPLEMENT : Genre list");
};

//ht trang chi tiet cho 1 the loai cu the
exports.genre_detail = function (req, res) {
  res.send("NOT IMPLEMENT : Genre detail " + req.params.id);
};

//ht tao bieu mau the loai tren GET
exports.genre_create_get = function (req, res) {
  res.send("NOT IMPLEMENT : Genre create GET");
};

//xu li tao the loai tren post
exports.genre_create_post = function (req, res) {
  res.send("NOT IMPLEMENT : Genre create POST");
};

//ht xoa bieu mau the loai tren get
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENT : Genre delete GET");
};

//xu li xoa the loai tren post
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENT : Genre delete POST");
};

//xu li cap nhap bieu mau the loai tren get
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENT : Genre update GET");
};

//xu li  cap nhap the loai tren post
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENT : Genre update POST");
};
