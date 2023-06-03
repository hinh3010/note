Kiến trúc của NATS bao gồm các thành phần chính sau:

1. NATS Server: Là thành phần chính của NATS, chịu trách nhiệm cho việc truyền tải và định tuyến các message giữa các client. NATS Server hoạt động trên mô hình publish-subscribe, cho phép các client đăng ký nhận các message từ các chủ đề mà họ quan tâm.

2. Client Libraries: NATS hỗ trợ các client libraries cho nhiều ngôn ngữ lập trình khác nhau, bao gồm Java, Python, Go, Node.js, Ruby, và nhiều ngôn ngữ khác. Client libraries giúp cho việc sử dụng NATS trở nên dễ dàng hơn.

3. NATS Streaming: NATS Streaming là một mô-đun bổ sung cho NATS, cung cấp tính năng đảm bảo độ tin cậy và xử lý dữ liệu theo thứ tự. NATS Streaming hoạt động trên mô hình publish-subscribe, cho phép các client đăng ký nhận các message từ các chủ đề mà họ quan tâm, đồng thời cung cấp tính năng đảm bảo độ tin cậy và xử lý dữ liệu theo thứ tự.

4. Bridge: NATS Bridge cho phép các NATS Server kết nối với nhau, giúp cho việc truyền tải và định tuyến các message trở nên dễ dàng hơn trong các môi trường phân tán.

5. Monitoring and Management: NATS cung cấp các công cụ giám sát và quản lý, cho phép người dùng giám sát hoạt động của NATS Server và các client, cũng như quản lý các tài nguyên liên quan đến NATS.

6. Security: NATS hỗ trợ các tính năng bảo mật như TLS và một số phương thức xác thực, giúp cho việc truyền tải dữ liệu trở nên an toàn hơn.

7. Clustering: NATS hỗ trợ các tính năng clustering, cho phép người dùng mở rộng NATS Server để đáp ứng các yêu cầu về tải và độ tin cậy.