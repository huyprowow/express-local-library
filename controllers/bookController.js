var Book = require("../models/book");

//hien thi trang chao mung (trang chu - home page) cua trang web
exports.index = function (req, res) {
  res.send("NOT IMPLEMENT : Site Home Page");
};

//ht danh sach tat ca cac sach
exports.book_list = function (req, res) {
  //xu li xong req =>k co ham next
  res.send("NOT IMPLEMENT : Book list");
};

//ht trang chi tiet cho 1 sach cu the
exports.book_detail = function (req, res) {
  res.send("NOT IMPLEMENT : Book detail" + req.params.id);
};

//ht tao bieu mau sach tren GET
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENT : Book create GET");
};

//xu li tao sach tren post
exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENT : Book create POST");
};

//ht xoa bieu mau sach tren get
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENT : Book delete GET");
};

//xu li xoa sach tren post
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENT : Book delete POST");
};

//xu li cap nhap bieu mau sach tren get
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENT : Book update GET");
};

//xu li  cap nhap sach tren post
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENT : Book update POST");
};
