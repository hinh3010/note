use hellocacbantre;

CREATE table position (
    id char(10) primary key,
    position_name nvarchar(50)
);

CREATE table coefficients_salary (
    id char(10) primary key,
    coefficients_salary int
);

CREATE table department (
    id char(10) primary key,
    department_name nvarchar(50),
    nguoi_quan_ly char(10) not null
);

CREATE table qualification (
    id char(10) primary key,
    qualification_name nvarchar(50)
);

CREATE table staff (
    id char(10) primary key,
    fullname nvarchar(50),
    birtday Date,
    gender bit,
    address nvarchar(50),
    phone char(20),
    email nvarchar(50),
    avatar nvarchar(500),
    position_id char(10) not null,
    qualification_id char(10) not null,
    coefficients_salary_id char(10) not null,
    department_id char(10) not null,
);

alter table
    staff
add
    constraint fk_position_staff foreign key (position_id) references position(id);

alter table
    staff
add
    constraint fk_qualification_staff foreign key (qualification_id) references qualification(id);

alter table
    staff
add
    constraint fk_department_staff foreign key (department_id) references department(id);

alter table
    staff
add
    constraint fk_coefficients_salary_staff foreign key (coefficients_salary_id) references coefficients_salary(id)