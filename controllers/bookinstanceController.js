const book = require("../models/book");
var BookInstance = require("../models/bookinstance");

//ht danh sach tat ca cac phien ban sach
exports.bookinstance_list = function (req, res, next) {
  //xu li xong req =>k co ham next
  // res.send("NOT IMPLEMENT : BookInstance list");

  BookInstance.find()
    .populate("book")
    .exec(function (err, list_bookinstances) {
      if (err) {
        return next(err);
      }
      //thanh cong =>render
      res.render("bookinstance_list", {
        title: "Book Instance",
        bookinstance_list: list_bookinstances,
      });
    });
};

//ht trang chi tiet cho 1 phien ban sach cu the
exports.bookinstance_detail = function (req, res, next) {
  // res.send("NOT IMPLEMENT : BookInstance detail " + req.params.id);

  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookinstance) {
      if (err) return next(err);
      if (bookinstance == null) {
        var err = new Error("BookInstance not found");
        err.status = 404;
        return next(err);
      }
      res.render("bookinstance_detail", {
        title: "Copy: " + bookinstance.book.title,
        bookinstance: bookinstance,
      });
    });
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
