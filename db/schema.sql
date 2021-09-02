DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
    dept_id INT AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (dept_id)
);

SELECT * FROM role
JOIN department ON role.department_id = department.dept_id;


CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(dept_id),
    PRIMARY KEY (role_id)
);

SELECT * FROM employee
JOIN role ON employee.emp_role_id = role.role_id;

# this works due to left join
SELECT  e.emp_id 'Emp_Id', e.first_name 'First Name', e.last_name 'Last Name', 
m.emp_id 'Mgr_Id', m.first_name 'Manager: First Name' , m.last_name 'Manager: Last Name' 
FROM employee e 
LEFT JOIN employee m 
ON (e.manager_id = m.emp_id);


# shows employees with manager id
SELECT emp_id, last_name, first_name, manager_id
FROM employee;


SELECT 
   (e.emp_id) employee, concat(e.first_name, ' ', e.last_name) employee, 
   (m.manager_id) manager, concat(m.first_name, ' ', m.last_name) manager
FROM
    employee e, 
LEFT JOIN
    employee m ON m.emp_id = e.manager_id;


create table employee (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    emp_role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (emp_role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);
# 	THIS ONE 
SELECT * FROM employee 
LEFT JOIN (role, department)
ON (role.role_id = employee.emp_role_id AND role.department_id = department.dept_id);



