const Book = require("../models/book");
var BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");
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
exports.bookinstance_create_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : BookInstance create GET");

  Book.find({}, "title").exec(function (err, books) {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  });
};

//xu li tao bieu mau phien ban sach tren post
exports.bookinstance_create_post = [
  // res.send("NOT IMPLEMENT : BookInstance create POST");

  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      Book.find({}, "title").exec(function (err, books) {
        if (err) {
          return next(err);
        }

        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance: bookinstance,
        });
      });
      return;
    } else {
      bookinstance.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(bookinstance.url);
      });
    }
  },
];

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
