//nhap express tao dt router
var express = require("express");
var router = express.Router();

//chi dinh tuyen tren doi tuong
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//http:localhost:3000/users/cool/
router.get("/cool", function (req, res, next) {
  res.send("You're so cool");
});

//xuat tuyen
module.exports = router;
