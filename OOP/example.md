```ts
// Định nghĩa một lớp đối tượng Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Phương thức trả về thông tin của một người
  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Định nghĩa một lớp đối tượng Employee kế thừa từ lớp Person
class Employee extends Person {
  constructor(name, age, salary) {
    super(name, age);
    this.salary = salary;
  }

  // Phương thức trả về thông tin của một nhân viên
  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}`;
  }

  // Phương thức tính lương thưởng của một nhân viên
  calculateBonus() {
    return this.salary * 0.1;
  }
}

// Tạo một đối tượng Employee
let employee = new Employee("John", 30, 5000);

// Gọi phương thức getInfo của đối tượng Employee
console.log(employee.getInfo()); // Name: John, Age: 30, Salary: 5000

// Gọi phương thức calculateBonus của đối tượng Employee
console.log(employee.calculateBonus()); // 500

// Các tính chất của OOP được minh họa trong ví dụ trên:

Tính đóng gói (Encapsulation): Khi khai báo các thuộc tính và phương thức trong lớp, chúng được giấu đi và chỉ được truy cập thông qua các phương thức công khai.

Tính kế thừa (Inheritance): Lớp Employee kế thừa từ lớp Person, kế thừa các thuộc tính và phương thức của lớp cha và có thể định nghĩa các thuộc tính và phương thức mới.

Tính đa hình (Polymorphism): Phương thức getInfo được định nghĩa lại trong lớp Employee, có chức năng khác so với phương thức cùng tên trong lớp cha.

Tính trừu tượng (Abstraction): Lớp Person và Employee đại diện cho các thực thể trong thế giới thực nhưng chỉ hiển thị các phương thức và thuộc tính cần thiết để sử dụng.

Tính tương tác (Interaction): Đối tượng employee tương tác với các phương thức của lớp thông qua việc gọi phương thức calculateBonus và getInfo.