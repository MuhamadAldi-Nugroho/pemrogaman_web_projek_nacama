const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const USERS_FILE = "./data/users.json";

// ====================
// REGISTER
// ====================
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

  const userExist = users.find((user) => user.email === email);

  if (userExist) {
    return res.json({
      status: "error",
      message: "Email sudah terdaftar",
    });
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    jobTitle: "",
    phone: "",
    company: "",
    website: "",
    address: "",
    avatarColor: "#D4AF37",
  });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({
    status: "success",
    message: "Registrasi berhasil",
  });
});

// ====================
// LOGIN
// ====================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.json({
      status: "error",
      message: "Email atau Password salah",
    });
  }

  res.json({
    status: "success",
    message: "Login berhasil",
    user,
  });
});

app.post("/update-profile", (req, res) => {
  const updatedUser = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

  const index = users.findIndex((user) => user.id == updatedUser.id);

  if (index === -1) {
    return res.json({
      status: "error",
      message: "User tidak ditemukan",
    });
  }

  users[index] = {
    ...users[index],
    ...updatedUser,
  };

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({
    status: "success",
    message: "Profile berhasil disimpan",
    user: users[index],
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
