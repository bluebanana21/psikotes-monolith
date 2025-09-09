import db from "../config/database.conf.ts";
import bcrypt from "bcrypt";

const plainPassword = "12341234";
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (error, hashedPassword) => {
  if (error) throw error;

  const insertUsers = `
  INSERT INTO users (name, email, password, DoB, PoB, gender)
  SELECT 'test', 'test@gmail.com', '${hashedPassword}', DATE('2013-02-12'), 'Jakarta', 'Laki-laki'
  FROM dual
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = 'test' AND email = 'test@gmail.com');
`;

  db.query(insertUsers, function (err: any, result: any) {
    if (err) throw err;
    console.log("successfully inserted users");
  });
});

export default {};
