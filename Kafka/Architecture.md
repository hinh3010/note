Kiến trúc của Kafka bao gồm các thành phần chính sau:

1. Broker: Là nơi lưu trữ các message được gửi đến Kafka. Mỗi broker có thể được triển khai trên một máy chủ riêng biệt hoặc nhiều máy chủ có thể chạy broker để tạo thành một Kafka cluster.

2. Topic: Là tên của một loại message trong Kafka. Mỗi message được gửi đến Kafka sẽ được gắn vào một topic cụ thể. Topic có thể có nhiều partition để tăng khả năng mở rộng và đồng thời tối ưu tốc độ xử lý.

3. Partition: Là một phần của một topic, một partition là một chuỗi message được lưu trữ trên một broker. Một topic có thể có nhiều partition, và mỗi partition được lưu trữ trên một broker khác nhau trong cluster.

4. Producer: Là thành phần tạo ra message và gửi chúng đến Kafka. Producer chịu trách nhiệm chọn topic và partition phù hợp để gửi message.

5. Consumer: Là thành phần đọc các message từ Kafka. Consumer chịu trách nhiệm chọn topic và partition cần đọc message.

6. Consumer Group: Là một nhóm các consumer cùng đọc message từ một topic. Mỗi message trong một partition chỉ được đọc bởi một consumer trong một consumer group duy nhất.

7. ZooKeeper: Là một hệ thống phân tán để quản lý tập hợp các broker và consumer trong Kafka cluster. ZooKeeper cũng giúp Kafka theo dõi trạng thái của các broker và consumer và đồng bộ hóa các thông tin liên quan đến Kafka cluster.