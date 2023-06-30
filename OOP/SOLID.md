# Trong lập trình hướng đối tượng (OOP), "solid" là một từ viết tắt được sử dụng để đề cập đến các nguyên tắc thiết kế phần mềm được đưa ra bởi Robert C. Martin, bao gồm:

* Single Responsibility Principle (SRP): Một lớp chỉ nên có một trách nhiệm duy nhất.
* Open-Closed Principle (OCP): Một lớp nên mở rộng được nhưng không được sửa đổi (đóng cho sửa đổi).
* Liskov Substitution Principle (LSP): Đối tượng của một lớp con có thể thay thế đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình.
* Interface Segregation Principle (ISP): Nên thiết kế các giao diện nhỏ, tách biệt để không đưa vào các phương thức không cần thiết cho đối tượng.
* Dependency Inversion Principle (DIP): Các module cấp cao không nên phụ thuộc trực tiếp vào các module cấp thấp. Thay vào đó, cả hai nên phụ thuộc vào một interface trung gian.


```ts
1 Single Responsibility Principle (SRP): Một lớp chỉ nên có một trách nhiệm duy nhất. Điều này giúp chúng ta dễ dàng bảo trì và mở rộng lớp đó mà không ảnh hưởng đến các phần khác của chương trình. Ví dụ:

Trong ví dụ này, lớp User đảm nhiệm hai trách nhiệm khác nhau là xác thực người dùng và quản lý hồ sơ người dùng. Điều này không tốt vì nếu cần thay đổi một phần của lớp User, chúng ta có thể làm ảnh hưởng đến phần khác. Thay vì đó, chúng ta nên tách lớp User thành hai lớp riêng biệt, mỗi lớp đảm nhiệm một trách nhiệm riêng.

class User {
  private String name;
  private String email;
  private int age;

  public void setName(String name) {
    this.name = name;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setAge(int age) {
    this.age = age;
  }

  // Methods related to user authentication
  public boolean login(String email, String password) {
    // implementation
  }

  public boolean logout() {
    // implementation
  }

  // Methods related to user profile
  public void updateProfile() {
    // implementation
  }

  public void viewProfile() {
    // implementation
  }
}


2 Open-Closed Principle (OCP): Một lớp nên mở rộng được nhưng không được sửa đổi (đóng cho sửa đổi). Điều này giúp chúng ta dễ dàng mở rộng chức năng của chương trình mà không làm ảnh hưởng đến các phần khác của chương trình. Ví dụ:

Trong ví dụ này, lớp Shape đại diện cho tất cả các hình dạng. Nếu chúng ta muốn thêm một hình dạng mới, chúng ta có thể tạo một lớp mới kế thừa từ Shape mà không cần sửa đổi lớp Shape. Điều này giúp chúng ta dễ dàng mở rộng chương trình mà không làm ảnh hưởng đến lớp Shape hoặc các lớp khác trong chương trình.

class Shape {
  public void draw() {
    // implementation
  }
}

class Square extends Shape {
  @Override
  public void draw() {
    // implementation
  }
}

class Circle extends Shape {
  @Override
  public void draw() {
    // implementation
  }
}

3 Liskov Substitution Principle (LSP): Đối tượng của một lớp con có thể thay thế đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình. Điều này giúp chúng ta dễ dàng sử dụng đối tượng của lớp con như đối tượng của lớp cha mà không cần quan tâm đến lớp con đó là gì. Ví dụ:
interface Animal {
  void makeSound();
}

class Dog implements Animal {
  @Override
  public void makeSound() {
    // implementation
  }
}

class Cat implements Animal {
  @Override
  public void makeSound() {
    // implementation
  }
}

class AnimalSound {
  public void makeAnimalSound(Animal animal) {
    animal.makeSound();
  }
}