var Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");
// var mongoose = require("mongoose");

//ht danh sach tat ca cac the loai
exports.genre_list = function (req, res) {
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
