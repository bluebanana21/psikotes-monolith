import db from "../config/database.conf";

const insertUsers = `
INSERT INTO users (name, email, password, DoB, PoB, gender)
SELECT * FROM (SELECT 'test', 'test@gmail.com', '12341234', '2024-01-01', 'Jakarta', 'Laki-laki') AS tmp
WHERE NOT EXISTS (
    SELECT name FROM users WHERE name = 'test'
) LIMIT 1;
`;

db.query(insertUsers, function (err: any, result: any) {
  if (err) throw err;
  console.log("Table created");
});

export default insertUsers;
