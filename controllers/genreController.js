var Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");
//npm install express-validator
const { body, validationResult } = require("express-validator");
const genre = require("../models/genre");

// var mongoose = require("mongoose");

//ht danh sach tat ca cac the loai
exports.genre_list = function (req, res, next) {
  //xu li xong req =>k co ham next
  // res.send("NOT IMPLEMENT : Genre list");
  Genre.find()
    .sort([["name", 1]])
    .exec(function (err, list_category) {
      if (err) return next(err);
      res.render("category_list", {
        title: "Genre List",
        category_list: list_category,
      });
    });
};

//ht trang chi tiet cho 1 the loai cu the
exports.genre_detail = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Genre detail " + req.params.id);

  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.genre === null) {
        //k co kqua
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

//ht tao bieu mau the loai tren GET
exports.genre_create_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Genre create GET");
  res.render("genre_form", { title: "Create Genre" });
};

//xu li tao the loai tren post
exports.genre_create_post = [
  //xac thuc va lm sach truong name
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  //xu li yeu cau sau khi xac thuc va lam sach
  (req, res, next) => {
    // res.send("NOT IMPLEMENT : Genre create POST");
    //trich loi tu ket qua xac thuc
    const errors = validationResult(req);
    //tao dt voi ten da dc thoat va bo khoang cach 2 dau
    var genre = new Genre({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      //co loi, render lai bieu mau voi gia tri da dc lm sach va thong bao loi
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      //dl nhap vao hop le
      // kiem tra xem da co the loai cung ten chua
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) return next(err);

        if (found_genre) {
          //neu co chuyen den trang xem chi tiet
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) return next(err);
            //the loai da dc luu, chuyen trang den do
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

//ht xoa bieu mau the loai tren get
exports.genre_delete_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Genre delete GET");
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre === null) {
        res.redirect("/catalog/genres");
      }
      res.render("genre_delete", {
        title: "Delete Genre",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

//xu li xoa the loai tren post
exports.genre_delete_post = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Genre delete POST");
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.body.genreid).exec(callback); //req.body.genreid vi lay id tu form chuw k lay tu url
      },
      genre_books: function (callback) {
        Book.find({ genre: req.body.genreid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.genre_books.length > 0) {
        res.render("genre_delete", {
          title: "Delete Genre",
          genre: results.genre,
          genre_books: results.genre_books,
        });
        return;
      } else {
        Genre.findByIdAndRemove(req.body.genreid, function deleteGenre(err) {
          if (err) return next(err);
          res.redirect("/catalog/genres");
        });
      }
    }
  );
};

//xu li cap nhap bieu mau the loai tren get
exports.genre_update_get = function (req, res, next) {
  // res.send("NOT IMPLEMENT : Genre update GET");
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },
    },
    function (err, result) {
      if (err) return next(err);
      if (result.genre === null) {
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.render("genre_form", { title: "Update Genre", genre: result.genre });
    }
  );
};

//xu li  cap nhap the loai tren post
exports.genre_update_post = [
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // res.send("NOT IMPLEMENT : Genre update POST");
    const errors = validationResult(req);
    var genre = new Genre({ name: req.body.name, _id: req.params.id });
    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Update Genre",
        genre: genre,
        errors: errors.array(),
      });
    } else {
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) return next(err);

        if (found_genre) {
          //neu co chuyen den trang xem chi tiet
          res.redirect(found_genre.url);
        } else {
          Genre.findByIdAndUpdate(
            req.params.id,
            genre,
            {},
            function (err, thegenre) {
              if (err) {
                return next(err);
              }
              res.redirect(thegenre.url);
            }
          );
        }
      });
    }
  },
];
