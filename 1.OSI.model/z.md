# OSI (Open Systems Interconnection) Model 
là một mô hình tham chiếu để mô tả cách thức thông tin được truyền qua một mạng máy tính. Mô hình OSI được tạo ra bởi Tổ chức Tiêu chuẩn Hóa Quốc tế (ISO) để giúp các nhà sản xuất thiết bị mạng và các nhà cung cấp dịch vụ mạng đồng bộ hóa các chuẩn kỹ thuật và giao thức mạng. Mô hình OSI được phân chia thành 7 tầng, mỗi tầng đại diện cho một chức năng cụ thể của việc truyền thông qua mạng:

* Tầng Vật lý (Physical Layer): Tầng này định nghĩa các đặc tả về các đường truyền vật lý, các thiết bị phát và nhận tín hiệu, các chuẩn kết nối vật lý, các đặc tính về tần số, độ dài sóng và tốc độ truyền dữ liệu.

* Tầng Liên kết Dữ liệu (Data Link Layer): Tầng này đảm bảo việc truyền dữ liệu giữa các thiết bị trên cùng một mạng vật lý, bằng cách đóng gói dữ liệu thành các khung (frames) và thực hiện kiểm tra lỗi và xác thực (authentication) trước khi truyền dữ liệu.

* Tầng Mạng (Network Layer): Tầng này quản lý việc định tuyến (routing) và chuyển tiếp (forwarding) dữ liệu giữa các mạng khác nhau. Tầng này sử dụng địa chỉ IP để định danh các thiết bị và định tuyến các gói tin dữ liệu trên mạng.

* Tầng Giao Thức Vận Chuyển (Transport Layer): Tầng này đảm bảo chất lượng dịch vụ (Quality of Service - QoS) và xác định cách thức chia sẻ băng thông (congestion control), đảm bảo việc truyền dữ liệu đáng tin cậy và chính xác.5. Tầng Phiên (Session Layer): Tầng này quản lý các phiên truyền thông giữa các thiết bị, bao gồm việc thiết lập, duy trì và kết thúc phiên truyền thông. Tầng này cũng đảm bảo tính toàn vẹn (integrity) của dữ liệu trong suốt phiên truyền thông.

* Tầng Trình Diễn (Presentation Layer): Tầng này đảm bảo việc mã hóa và giải mã (encryption/decryption) dữ liệu, đảm bảo tính toàn vẹn và bảo mật của dữ liệu truyền qua mạng.

* Tầng Ứng Dụng (Application Layer): Tầng này định nghĩa các giao thức và các ứng dụng cho việc truyền thông qua mạng, bao gồm các ứng dụng như trình duyệt web, email, trò chơi trực tuyến, và các dịch vụ khác.

Mỗi tầng trong mô hình OSI có chức năng cụthể của mình và tương tác với các tầng khác trong mô hình để đảm bảo việc truyền thông dữ liệu qua mạng. Mô hình OSI giúp các nhà thiết kế mạng và các nhà cung cấp dịch vụ mạng hiểu rõ hơn về cách thức hoạt động của mạng và giúp họ đồng bộ hóa các chuẩn kỹ thuật và giao thức mạng để đảm bảo tính tương thích giữa các thiết bị và dịch vụ mạng khác nhau.