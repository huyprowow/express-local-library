var BookInstance = require("../models/bookinstance");

//ht danh sach tat ca cac phien ban sach
exports.bookinstance_list = function (req, res) {
  //xu li xong req =>k co ham next
  res.send("NOT IMPLEMENT : BookInstance list");
};

//ht trang chi tiet cho 1 phien ban sach cu the
exports.bookinstance_detail = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance detail " + req.params.id);
};

//ht phien ban sach tao bieu mau tren GET
exports.bookinstance_create_get = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance create GET");
};

//xu li tao bieu mau phien ban sach tren post
exports.bookinstance_create_post = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance create POST");
};

//ht xoa phien bieu mau ban sach tren get
exports.bookinstance_delete_get = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance delete GET");
};

//xu li xoa phien ban sach tren post
exports.bookinstance_delete_post = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance delete POST");
};

//ht cap nhap bieu mau phien ban sach tren get
exports.bookinstance_update_get = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance update GET");
};

//xu li  cap nhap phien ban sach tren post
exports.bookinstance_update_post = function (req, res) {
  res.send("NOT IMPLEMENT : BookInstance update POST");
};
