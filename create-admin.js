import bcrypt from "bcryptjs"; // Using ES module import syntax

const testPassword = "3173@Mridul";
bcrypt.hash(testPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log("Hash:", hash);
  bcrypt.compare(
    testPassword,
    "$2a$10$t0LaVYiMgW8.woyGq/gk0OSoX07lqhzZ0yIkJA19mN1OjNnkn27Nm",
    (err, result) => {
      if (err) throw err;
      console.log("Is match:", result); // Should be true
    }
  );
});
