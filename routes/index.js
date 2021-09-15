var express = require('express');
var router = express.Router();

// tuyến hiển thị phản hồi bằng cách sử dụng 
//"index" mẫu chuyển biến mẫu "title"
//chuyen bien title cho mau .pug hien thi
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
