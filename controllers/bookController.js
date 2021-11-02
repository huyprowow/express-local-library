//git reset --hard HEAD^ unrevert neu chua push
var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");
const { body, validationResult } = require("express-validator");
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
exports.book_update_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Book update GET");
  //get sách, tác giả và thể loại cho form.
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book === null) {
        //vi dang update sach co cai id do nen k the k tim thay dc
        var err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }
      //Đánh dấu các thể loại đã chọn cua sach là checked
      for (
        let all_genre_iter = 0;
        all_genre_iter < results.genres.length;
        all_genre_iter++
      ) {
        for (
          let book_genre_iter = 0;
          book_genre_iter < results.book.genre.length;
          book_genre_iter++
        ) {
          if (
            results.genres[all_genre_iter]._id.toString() ===
            results.book.genre[book_genre_iter]._id.toString()
          ) {
            results.genres[all_genre_iter].checked = "true";
          }
        }
      }
      res.render("book_form", {
        title: "Update Book",
        book: results.book,
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

//xu li  cap nhap sach tren post
exports.book_update_post = [
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
(req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var book = new Book(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                authors: function(callback) {
                    Author.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('book_form', { title: 'Update Book',authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Book.findByIdAndUpdate(req.params.id, book, {}, function (err,thebook) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(thebook.url);
                });
        }
    }
];
