<!-- images -->
# docker image
- xem danh sách các lệnh dùng được
  
# docker images
- danh sách các images trong máy
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
mysql        8.0       40b83de8fb1a   7 days ago   535MB

# docker search [keyword]
- tìm kiếm images trên docker

# docker pull [images]
- tải images về máy
- có thể chỉ định phiên bản bằng cách thêm sau tên images `:[version]`

# docker image rm [images]:[version] || docker rm image [image_id]
- xóa image trong máy
- không cần nhập đầy đủ id

<!-- container -->

# docker run [params{}] [command] [param_command]  [image]
- param[1] : -i : cho phép tương tác
- param[2] : -t : cho phép kết nối với terminal
- image : tên image || image_id
- exit để thoát và dừng container
- ctrl + p + q để thoát container và container vẫn chạy

# vd : docker run -it --name "[NAME]" -h [HOST] centos:latest
- `-it`  cho phép tương tác + kết nối terminal
- `-name` đổi tên khi chạy `NAME`
- `-h` tên host `HOST`

# docker ps
- kiểm tra xem các  container đang chạy
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
79a359678be0   5d        "/bin/bash"   21 seconds ago   Up 17 seconds             competent_ellis

# docker ps -a
- để xem các container kể cả container không chạy

# docker start [name] || docker start [container_id]
- để chạy các container đang dừng

# docker stop [name] || docker stop [container_id]
- để dừng các container đang chạy ở bên ngoài container
  
# docker attach [name] || docker attach [container_id]
- để vào terminal của container

# docker rm [name] || docker rm [container_id]
- xoá container đang dừng 
  
# docker rm -f [name] || docker rm -f [container_id]
- xoá container 