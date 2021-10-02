var express = require('express');
var router=express.Router();

//yeu cau cac module controller(bo dk)
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController')
var book_instance_controller = require('../controllers/bookinstanceController');

/// BOOK ROUTER ///

//GET catalog home page (tai trang chu danh muc)
router.get('/',book_controller.index);

//nhan(GET) yeu cau tao sach(Book) luu y dieu nay phai dat trc cac tuyen hien thi sach (su dung id)
router.get('/book/create',book_controller.book_create_get);

//dang(POST) yeu cau tao sach(Book)
router.post('/book/create',book_controller.book_create_post);

//nhan(GET) yeu cau xoa sach(Book)
router.get('/book/:id/delete',book_controller.book_delete_get);

//dang(POST) yeu cau xoa sach(Book)
router.post('/book/:id/delete',book_controller.book_create_post);

//nhan(GET) yeu cau cap nhap sach(Book)
router.get('/book/:id/update',book_controller.book_update_get);

//dang(POST) yeu cau cap nhap sach(Book)
router.post('/book/:id/update',book_controller.book_update_post);

//nhan(GET) yeu cau cho 1 quyen sach(Book)
router.get('/book/:id',book_controller.book_detail);

//nhan(GET) yeu cau cho danh sach tat ca cac quyen sach(Book)
router.get('/books',book_controller.book_list);

/// AUTHOR ROUTERS ///

//nhan(GET) yeu cau tao tac gia (Author) luu y dieu nay phai dat trc cac tuyen cho id (tuc la tac gia hien thi)
router.get('/author/create',author_controller.author_create_get);

//dang(POST) yeu cau tao tac gia (Author)
router.post('/author/create',author_controller.author_create_post);

//nhan(GET) yeu cau xoa tac gia (Author)
router.get('/author/:id/delete',author_controller.author_delete_get);

//dang(POST) yeu cau xoa tac gia (Author)
router.post('/author/:id/delete',author_controller.author_create_post);

//nhan(GET) yeu cau cap nhap tac gia (Author)
router.get('/author/:id/update',author_controller.author_update_get);

//dang(POST) yeu cau cap nhap tac gia (Author)
router.post('/author/:id/update',author_controller.author_update_post);

//nhan(GET) yeu cau cho 1 tac gia (Author)
router.get('/author/:id',author_controller.author_detail);

//nhan(GET) yeu cau cho danh sach tat ca tac gia (Author)
router.get('/authors',author_controller.author_list);

/// GENRE ROUTERS ///

//nhan(GET) yeu cau tao the loai (Genre) luu y dieu nay phai dat trc cac tuyen hien thi sach (su dung id)
router.get('/genre/create',genre_controller.genre_create_get);

//dang(POST) yeu cau tao the loai (Genre)
router.post('/genre/create',genre_controller.genre_create_post);

//nhan(GET) yeu cau xoa the loai (Genre)
router.get('/genre/:id/delete',genre_controller.genre_delete_get);

//dang(POST) yeu cau xoa the loai (Genre)
router.post('/genre/:id/delete',genre_controller.genre_create_post);

//nhan(GET) yeu cau cap nhap the loai (Genre)
router.get('/genre/:id/update',genre_controller.genre_update_get);

//dang(POST) yeu cau cap nhap the loai (Genre)
router.post('/genre/:id/update',genre_controller.genre_update_post);

//nhan(GET) yeu cau cho 1 the loai (Genre)
router.get('/genre/:id',genre_controller.genre_detail);

//nhan(GET) yeu cau cho danh sach tat ca cac the loai (Genre)
router.get('/genres',genre_controller.genre_list);

/// BOOKINSTANCE ROUTERS ///

//nhan(GET) yeu cau tao phien ban sach(BookInstance) luu y dieu nay phai dat trc cac tuyen hien thi sach (su dung id)
router.get('/bookinstance/create',book_instance_controller.bookinstance_create_get);

//dang(POST) yeu cau tao phien ban sach(BookInstance)
router.post('/bookinstance/create',book_instance_controller.bookinstance_create_post);

//nhan(GET) yeu cau xoa phien ban sach(BookInstance)
router.get('/bookinstance/:id/delete',book_instance_controller.bookinstance_delete_get);

//dang(POST) yeu cau xoa phien ban sach(BookInstance)
router.post('/bookinstance/:id/delete',book_instance_controller.bookinstance_create_post);

//nhan(GET) yeu cau cap nhap phien ban sach(BookInstance)
router.get('/bookinstance/:id/update',book_instance_controller.bookinstance_update_get);

//dang(POST) yeu cau cap nhap phien ban sach(BookInstance)
router.post('/bookinstance/:id/update',book_instance_controller.bookinstance_update_post);

//nhan(GET) yeu cau cho 1 phien ban sach(BookInstance)
router.get('/bookinstance/:id',book_instance_controller.bookinstance_detail);

//nhan(GET) yeu cau cho danh sach tat ca cac phien ban sach(BookInstance)
router.get('/bookinstances',book_instance_controller.bookinstance_list);

module.exports=router;