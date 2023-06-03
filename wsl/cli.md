# cat /etc/*release
- kiểm tra phiên bản

# mkdir [name_folder]
- tạo folder

# touch [name_file]
- tạo file

# cat [name_file]
- xem file
- có thẻ xem nhiều file

# echo "[content]" > [name_file]
- tạo file kèm nội dung
# echo "[content]" >> [name_file]
- thêm nội dung vào file


# tail  [name_file]
- lấy ra 10 dòng cuối cùng của file
- thêm `-n 5` lấy ra 5 dòng cuối cùng của file
- thêm `-f` lấy ra 10 dòng cuối cùng của file, tự động cập nhật nột dung theo file

# cp [đường_dẫn_file_gốc] [đường_dẫn_file_mới]
- copy file
# cp [đường_dẫn_folder_gốc] [đường_dẫn_folder_mới]
- thêm `-r` để copy được thư mục

# mv [đường_dẫn_file_gốc] [đường_dẫn_file_mới]
- di chuyển folder || file || đổi tên

# rm [name_file]
- xóa file
# rmdir [name_folder]
- xóa folder trống
# rm -r [name]
- xóa file || folder kể cả folder không trống

# ps aux
- xem task manager
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0   2828  2068 ?        Sl   11:06   0:00 /init
root       122  0.0  0.0   2416   112 ?        Ss   11:07   0:00 /init
root       123  0.0  0.0   2432   116 ?        S    11:07   0:00 /init
root       134  0.0  0.0   2432   116 ?        S    11:07   0:00 /init
root       145  0.0  0.0   2836   392 ?        Ss   11:56   0:00 /init
root       146  0.0  0.0   2836   396 ?        R    11:56   0:00 /init
root       147  0.7  0.0  10040  4892 pts/2    Ss   11:56   0:00 -bash
root       163  0.0  0.0  10616  3268 pts/2    R+   11:56   0:00 ps aux

# top || htop
- xem task manager tự động cập nhật
PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
1 root        20   0    2428   1800   1692 S   0.0   0.0   0:00.13 init
122 root      20   0    2416    112      0 S   0.0   0.0   0:00.00 init
123 root      20   0    2432    116      0 S   0.0   0.0   0:00.03 init
124 root      20   0 1393176  32356  14356 S   0.0   0.6   0:00.63 docker-desktop-
134 root      20   0    2432    116      0 S   0.0   0.0   0:00.00 init
135 root      20   0  758952  45216  26812 S   0.0   0.8   0:00.65 docker
145 root      20   0    2836    392      0 S   0.0   0.0   0:00.00 init
146 root      20   0    2836    396      0 S   0.0   0.0   0:00.01 init
147 root      20   0   10556   5424   3236 S   0.0   0.1   0:00.09 bash
170 root      20   0   10872   3660   3152 R   0.0   0.1   0:00.01 top

# df -h
- xem rom sử dụng
Filesystem      Size  Used Avail Use% Mounted on
none            2.8G  4.0K  2.8G   1% /mnt/wsl
/dev/sdd       1007G  2.0G  954G   1% /mnt/wsl/docker-desktop-data/isocache
none            2.8G   12K  2.8G   1% /mnt/wsl/docker-desktop/shared-sockets/host-services
/dev/sdc       1007G   61M  956G   1% /mnt/wsl/docker-desktop/docker-desktop-user-distro
drivers          61G   47G   15G  76% /usr/lib/wsl/drivers
none            2.8G     0  2.8G   0% /usr/lib/wsl/lib
/dev/sde       1007G  1.3G  955G   1% /
none            2.8G   80K  2.8G   1% /mnt/wslg
rootfs          2.8G  1.9M  2.8G   1% /init
none            2.8G     0  2.8G   0% /dev
none            2.8G  4.0K  2.8G   1% /run
none            2.8G     0  2.8G   0% /run/lock
none            2.8G     0  2.8G   0% /run/shm
none            2.8G     0  2.8G   0% /run/user
tmpfs           2.8G     0  2.8G   0% /sys/fs/cgroup
none            2.8G   72K  2.8G   1% /mnt/wslg/versions.txt
none            2.8G   72K  2.8G   1% /mnt/wslg/doc
drvfs            61G   47G   15G  76% /mnt/c
drvfs           416G  2.3G  414G   1% /mnt/d
/dev/loop0      358M  358M     0 100% /mnt/wsl/docker-desktop/cli-tools

# free -h
- xem ram đã sử dụng + còn trống
total        used        free      shared  buff/cache   available
Mem:          5.5Gi       968Mi       3.5Gi       4.0Mi       1.1Gi       4.3Gi
Swap:         2.0Gi          0B       2.0Gi

# kill [PID]
- tắt từ từ tiến trình trong task manager
- thêm `-9` : tắt ngay lập tức

# ping [host]
- xem tốc độ phản hồi của host

# uname || uname -a
-xem bản dựng

# passwd
- đổi mk

# explorer.exe .
- tìm bên windown