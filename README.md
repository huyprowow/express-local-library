## Express dùng mô hình mvc( model-view-controller)

**kiem tra cac tuyen (route):**

http://localhost:3000/

http://localhost:3000/catalog

http://localhost:3000/catalog/books

http://localhost:3000/catalog/bookinstances/

http://localhost:3000/catalog/authors/

http://localhost:3000/catalog/genres/

http://localhost:3000/catalog/book/5846437593935e2f8c2aa226

http://localhost:3000/catalog/book/create

***ket qua: k gap trang loi 404 => router ok***

**cài heroku:** npm install -g heroku
**dùng:** heroku.cmd

**tạo, đẩy remote**
* heroku.cmd create [tên remote (sau là url)]
* git push heroku main

**đặt biến cấu hình config (env,...)**
* heroku.cmd config:set NODE_ENV='production' **đặt thành product để cải thiện hiệu suất của và tạo ra các thông báo lỗi ít dài dòng hơn**
* heroku.cmd config:set MONGODB_URI='url_database' (URI hoac URL gi do thi tuy)
* heroku.cmd config  **kiểm tra các biến cấu hình (config)**

**gỡ lỗi**
* heroku.cmd logs    **Hiển thị log hiện tại**
* heroku.cmd logs --tail  **Hiển thị log hiện tại và tiếp tục cập nhật với bất kỳ kết quả mới nào**
* heroku.cmd ps   **Hiển thị trạng thái dyno**