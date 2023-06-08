Node.js là xử lý đơn luồng, nên nó sẽ chỉ làm một việc một lúc.

Node.js hỗ trợ chạy đa luồng thông qua sử dụng các tiến trình ngầm (child processes) và các thread pool. Tuy nhiên, Node.js không hỗ trợ trực tiếp đa luồng (multi-threading) trong một tiến trình.

Vì vậy, Node.js có thể được sử dụng để xử lý các tác vụ đa luồng nhưng không hỗ trợ trực tiếp đa luồng trong một tiến trình.

Blocking I/O là một phương pháp đồng bộ hóa, trong đó tiến trình sẽ bị chặn (blocked) cho đến khi hoạt động I/O được hoàn thành.
tiến trình sẽ không thể thực hiện bất kỳ hoạt động nào khác trong khi đợi I/O được hoàn thành

Non-blocking I/O là một phương pháp bất đồng bộ hóa, trong đó tiến trình không bị chặn khi chờ đợi hoạt động I/O. Thay vào đó, tiến trình sẽ tiếp tục thực thi các tác vụ khác và sẽ nhận được một thông báo (callback) khi hoạt động I/O được hoàn thành

Node.js hỗ trợ non-blocking I/O, cho phép các tiến trình tiếp tục thực thi các tác vụ khác trong khi đợi hoạt động I/O được hoàn thành. Việc sử dụng non-blocking I/O giúp tăng hiệu suất và độ tin cậy của ứng dụng Node.js.

Event loop là một phần quan trọng của Node.js, đóng vai trò quản lý và xử lý các sự kiện (events) trong ứng dụng Node.js. Event loop giúp Node.js có thể xử lý các hoạt động bất đồng bộ (asynchronous operations) một cách hiệu quả.
vòng lặp này sẽ luôn chạy trong suốt thời gian hoạt động của ứng dụng. Trong mỗi vòng lặp, event loop sẽ kiểm tra xem có sự kiện mới nào cần được xử lý hay không. Nếu có, event loop sẽ lấy sự kiện đó ra và đưa vào trong hàng đợi để xử lý. Sau khi xử lý xong sự kiện, event loop sẽ lặp lại quá trình này và tiếp tục kiểm tra xem có sự kiện mới nào cần được xử lý hay không.

Trong event loop của Node.js, có hai loại task chính là microtask và macrotask.
Microtask được thực thi trước macrostask
Microtask là các task có độ ưu tiên cao hơn và được đưa vào trong hàng đợi microtask queue, bao gồm các callback như Promise, process.nextTick(), Object.observe(), MutationObserver(). 
Macrotask là các task có độ ưu tiên thấp hơn và được đưa vào trong hàng đợi macrotask queue, bao gồm các callback như setTimeout(), setInterval(), setImmediate(), I/O operations,