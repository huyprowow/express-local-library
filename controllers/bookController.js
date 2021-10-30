//git reset --hard HEAD^ unrevert neu chua push
var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");
const { body,validationResult } = require("express-validator");
const book = require("../models/book");

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
    .sort({ title: 1 }) //sx ascending
    .populate("author")
    .exec(function (err, list_books) {
      if (err) return next(err);
      //thanh cong =>render ra view
      res.render("book_list", { title: "Book List", book_list: list_books });
    });
};

//ht trang chi tiet cho 1 sach cu the
exports.book_detail = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Book detail " + req.params.id);

  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book === null) {
        var err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }
      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        book_instances: results.book_instance,
      });
    }
  );
};

//ht tao bieu mau sach tren GET
exports.book_create_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Book create GET");
  //get tất cả các tác giả và thể loại mà có thể sử dụng để thêm vào sách của mình.
  async.parallel(
    {
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

//xu li tao sach tren post
exports.book_create_post = [
  //convert thể loại sang mảng
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") {
        req.body.genre = [];
      } else {
        req.body.genre = new Array(req.body.genre);
      }
    }
    next();
  },
  //validate,sanitize cac truong
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),
  //xl yeu cau sau khi validate,sanitize
  (req, res, next) => {
    // res.send("NOT IMPLEMENT : Book create POST");
    const errors = validationResult(req);
    var book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });
    if (!errors.isEmpty()) {
      //Có lỗi. Hiển thị lại biểu mẫu với các giá trị / thông báo lỗi đã được làm sạch
      //get tất cả các tác giả và thể loại cho form
      async.parallel(
        {
          authors: function (callback) {
            Author.find(callback);
          },
          genres: function (callback) {
            Genre.find(callback);
          },
        },
        function (err, results) {
          if (err) return next(err);

          //Đánh dấu các thể loại đã chọn của chúng tôi là đã chọn(checked)
          for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genre[i].checked = "true";
            }
          }

          res.render("book_form", {
            title: "Create Book",
            authors: results.authors,
            genres: results.genres,
            book: book,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      book.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(book.url);
      });
    }
  },
];

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
