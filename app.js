require("dotenv").config({ path: ".env" }); //config bien moi truowng

//nhap cac thu vien vao tep
var createError = require("http-errors"); //loi http
var express = require("express");
var path = require("path"); //ptich cu phap duong dan tm
var cookieParser = require("cookie-parser"); //chuyen doi cookie
var logger = require("morgan"); //ghi log
var compression = require('compression');//Máy chủ web thường có thể nén phản hồi HTTP được gửi trở lại máy khách, giảm đáng kể thời gian cần thiết để máy khách lấy và tải trang.Đối với một trang web có lưu lượng truy cập cao trong quá trình sản xuất, không sử dụng phần mềm trung gian này. Thay vào đó, sử dụng một proxy ngược nhưNginx
var helmet = require('helmet');//Nó có thể đặt tiêu đề HTTP thích hợp giúp bảo vệ ứng dụng của bạn khỏi các lỗ hổng web

//require() modul tu tm cac route chua ma xl tap hop cu the cua tuyen duong(duong dan url) co lien quan
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog"); //nhap ca tuyen duowng cho khu vuc catalog (danh muc) cua trang web

//tao dt ung dung nhanh
var app = express();

app.use(helmet());

//------------ ket noi voi csdl mongoDB -------------------
//Nhập modul mongoose
var mongoose = require("mongoose");
// Thiết lập kết nối mongoose mặc định
//url database cloud mongoDbAtlas azure tao bua de hoc :v
var mongoDB =  process.env.MONGODB_URL.toString(); //chuyen bien mt thanh chuoi
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise= global.Promise;
//Nhận kết nối mặc định
var db = mongoose.connection;
// Ràng buộc kết nối với sự kiện lỗi (để nhận thông báo về lỗi kết nối)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//thiet lap view engine(template-mau)
app.set("views", path.join(__dirname, "views")); //chi dinh thu muc noi chua cac mau-template
app.set("view engine", "pug"); //thiet lap view engine truong hop nay la pug

// sd app.use() de them cac tvien pmem trung gian vao chuoi xl yeu cau
//ngoai ra sd pmtg express.static sd express phuc vu tat ca tep tinh trong tmuc /public
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());//Compress tat ca routes
app.use(express.static(path.join(__dirname, "public")));

//them code xu li tuyen-route da dc nhap trc do vao chuoi xli yeu cau, xd tyen cu the cho cac phan khac nhau cua web
// ca duong dan dc chi dinh '/' '/users' dc coi nhu tien to cho cac duong dan dc xd trong cac tep da nhap
//vd modul users dc nhap cd 1 tuyen '/profile' => truy cap tai '/users/profile'
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter); //them tuyen catalog vao chuoi phan mem trung gian

//xd pt xl loi va ph http 404
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development(tlap cuc bo, chỉ cung cấp lỗi trong quá trình phát triển)
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//cau hinh day du, xuat no vao modul(la cai maf cho phep no co the im port vao /bin/www)
module.exports = app;
