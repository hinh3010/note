1. Bạn có thể giải thích cách Node.js hoạt động?
Trả lời: Node.js là một platform xây dựng trên nền tảng V8 JavaScript engine của Google. Node.js sử dụng mô hình non-blocking I/O để xử lý các hoạt động bất đồng bộ và quản lý các connection đến server. Node.js cũng hỗ trợ việc xử lý các request và response thông qua các module như HTTP, HTTPS, TCP, hoặc UDP.

2. Bạn có thể giải thích khái niệm non-blocking trong Node.js?
Trả lời: Non-blocking là một phương pháp xử lý các hoạt động I/O mà không làm chặn hoạt động của các tiến trình khác. Trong Node.js, các hoạt động I/O sẽ được thực thi bất đồng bộ, có nghĩa là các tiến trình khác vẫn có thể tiếp tục thực thi trong khi các hoạt động I/O vẫn đang được xử lý.

3. Bạn có thể giải thích cách sử dụng Promise và async/await trong Node.js?
Trả lời: Promise là một cơ chế xử lý bất đồng bộ trong JavaScript để xử lý các hoạt động I/O. Promise có thể được xử lý bằng cách sử dụng các phương thức then() và catch() để xử lý kết quả của hoạt động.

async/await là một cách để xử lý Promise trong Node.js một cách đồng bộ và dễ đọc hơn. Khi sử dụng async/await, ta sử dụng từ khóa async trước hàm và từ khóa await trước Promise để đợi kết quả trả về. 