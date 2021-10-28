var Author = require("../models/author");
var async = require("async");
var Book = require("../models/book");
var { body, validationResult } = require("express-validator");
//ht danh sach tat ca cac tac gia
exports.author_list = function (req, res) {
  //xu li xong req =>k co ham next
  // res.send("NOT IMPLEMENT : Author list");
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec(function (err, list_author) {
      if (err) {
        return next(err);
      }
      res.render("author_list", {
        title: "Author List",
        author_list: list_author,
      });
    });
};

//ht trang chi tiet cho 1 tac gia cu the
exports.author_detail = function (req, res) {
  // res.send("NOT IMPLEMENT : Author detail " + req.params.id);

  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: function (callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.author === null) {
        var err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
};

//ht tao bieu mau tac gia tren GET
exports.author_create_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Author create GET");
  res.render("author_form", { title: "Create Author" });
};

//xu li tao tac gia tren post
exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters"),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters"),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  function (req, res, next) {
    // res.send("NOT IMPLEMENT : Author create POST");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      author.save(function (err) {
        if (err) return next(err);
        res.redirect(author.url);
      });
    }
  },
];

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
