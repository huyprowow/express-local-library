var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");

//hien thi trang chao mung (trang chu - home page) cua trang web
exports.index = function (req, res) {
  // res.send("NOT IMPLEMENT : Site Home Page");
  async.parallel(
    {
      //sd async parallel kieu dt=> result nhan dc dang dt, dang key:value truy cap trong template =key
      book_count: function (callback) {
        Book.countDocuments({}, callback); //Chuyển một đối tượng trống làm điều kiện khớp để tìm tất cả các tài liệu của collection này
      },
      book_instance_count: function (callback) {
        Book.countDocuments({}, callback);
      },
      book_instance_available_count: function (callback) {
        Book.countDocuments({ status: "Available" }, callback); //dk trang thai available
      },
      author_count: function (callback) {
        Author.countDocuments({}, callback);
      },
      genre_count: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    function (err, results) {
      //luu y chua co xl loi thông thường
      //có thể sử dụng một đường dẫn thực thi riêng để xử lý việc hiển thị lỗi

      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

//ht danh sach tat ca cac sach
exports.book_list = function (req, res, next) {
  //neu xu li xong req =>k co ham next
  // res.send("NOT IMPLEMENT : Book list");

  Book.find({}, "title author")
    .sort({title:1})//sx ascending
    .populate("author")
    .exec(function (err, list_books) {
      if (err) return next(err);
      //thanh cong =>render ra view
      res.render("book_list", { title: "Book List", book_list: list_books });
    });
};

//ht trang chi tiet cho 1 sach cu the
exports.book_detail = function (req, res) {
  res.send("NOT IMPLEMENT : Book detail " + req.params.id);
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
