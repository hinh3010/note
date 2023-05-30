# Web Worker la gi
```js
/**
Web Worker là một tính năng của trình duyệt cho phép thực thi các tác vụ JavaScript trong nền (background) mà không làm ảnh hưởng đến giao diện người dùng (UI). Điều này giúp tránh tình trạng trang web bị đóng băng (freeze) hoặc chậm khi thực hiện các tác vụ phức tạp yêu cầu nhiều thời gian tính toán.
*/

/**
Trong khi JavaScript chạy trên trang web, nó thường chạy trên một luồng đơn (single thread), có nghĩa là chỉ có thể thực hiện một tác vụ tại một thời điểm. Tuy nhiên, với Web Worker, bạn có thể khởi tạo một luồng mới để thực thi các tác vụ JavaScript phức tạp mà không ảnh hưởng đến giao diện người dùng.
 */

/**
Sử dụng Web Worker để tính toán, xử lý hình ảnh, tải dữ liệu lớn hoặc thực hiện các tác vụ khác mà cần nhiều thời gian tính toán. Khi tác vụ được thực hiện xong, Web Worker sẽ trả về kết quả cho trang web chính thông qua việc gửi thông điệp (message) đến trang web chính.
 */
```

# Canvas & Web Worker
```js
/**
Khi sử dụng Canvas để vẽ đồ họa trên trang web, các tác vụ vẽ và xử lý hình ảnh có thể rất phức tạp và yêu cầu nhiều thời gian tính toán. Trong trường hợp này, sử dụng Web Worker có thể cải thiện hiệu suất của ứng dụng bằng cách thực hiện các tác vụ tính toán phức tạp trong nền mà không ảnh hưởng đến giao diện người dùng.
*/

/**
Ví dụ, khi vẽ các hình ảnh phức tạp hoặc thực hiện các hiệu ứng động trên Canvas, Web Worker có thể được sử dụng để tính toán các giá trị phức tạp, như tính toán màu sắc, ánh sáng, bóng đổ và các tính năng khác. Khi các tác vụ tính toán này được thực hiện trên một luồng khác, giao diện người dùng sẽ không bị chậm lại hoặc đóng băng trong quá trình vẽ.
 */
```

# Offscreen Canvas
```js
/**
Offscreen Canvas là một tính năng mới trong HTML5 cho phép tạo ra một đối tượng canvas nằm ngoài cây DOM (Document Object Model), vì vậy nó không bị gián đoạn bởi các hoạt động của DOM hoặc giao diện người dùng. Điều này giúp tăng hiệu suất và giảm thời gian phản hồi của ứng dụng web.
*/
```

# Offscreen Canvas & Web Worker
```js
/**
Khi sử dụng Offscreen Canvas trong Web Worker, các tác vụ vẽ và xử lý hình ảnh được thực hiện trên một luồng khác, không ảnh hưởng đến giao diện người dùng và giúp tăng hiệu suất của ứng dụng.
*/
/**
Khi sử dụng Offscreen Canvas trong Web Worker, bạn có thể tạo một đối tượng canvas trong Web Worker và sử dụng nó để xử lý các tác vụđồ họa phức tạp. Sau đó, kết quả của các tác vụ này có thể được gửi trở lại cho trang web chính thông qua việc gửi thông điệp (message) từ Web Worker đến trang web chính. Khi kết hợp với Web Worker, Offscreen Canvas giúp tăng hiệu suất của ứng dụng đồ họa trên trang web và tránh tình trạng đóng băng hoặc chậm khi thực hiện các tác vụ tính toán phức tạp.
*/
```