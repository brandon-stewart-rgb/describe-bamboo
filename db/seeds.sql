
INSERT INTO department (dept_name)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 23300.00, 1),
('Lead Engineer', 13300.00, 2),
('Accountant', 33300.00, 3),
('Lawer', 73300.00, 4),
('Sales Person', 33000.00, 1),
('Software Engineer', 23300.00, 2);



INSERT INTO employee (first_name, last_name, emp_role_id, manager_id) 
VALUES
  ('Stephen', 'King', 1,  NULL),
  ('Virginia', 'Woolf', 2,  NULL),
  ('Michael', 'Ondaatje', 3,  NULL),
  ('M.T.', 'Anderson', 3, 1),
  ('Kristina Lyn', 'Heitkamp', 4, 2),
  ('William', 'Blake', 5, NULL),
  ('Edgar Allan', 'Poe', 6, 1 ),
  ('Leo', 'Tolstoy', 2, 1 ),
  ('Jane', 'Austen', 3, NULL);



