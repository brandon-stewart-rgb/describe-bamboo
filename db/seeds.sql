
INSERT INTO department (name)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 23300, 1),
('Lead Engineer', 13300, 2),
('Accountant', 33300, 3),
('Lawer', 73300, 4),
('Sales Person', 33000, 1),
('Software Engineer', 23300, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, 9),
  ('Jack', 'London', 2, 8),
  ('Robert', 'Bruce', 3, 7),
  ('Peter', 'Greenaway', 4, NULL),
  ('Derek', 'Jarman', 1, 5 ),
  ('Paolo', 'Pasolini', 2, 4 ),
  ('Heathcote', 'Williams', 3, NULL),
  ('Sandy', 'Powell', 4, 2 ),
  ('Emil', 'Zola', 1, 1),
  ('Sarah', 'Lourd', 2, null);



