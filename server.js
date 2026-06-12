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

  const user = users.find((user) => user.email === email && user.password === password);

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

// ====================
// GET USER BY ID
// ====================
app.get("/user/:id", (req, res) => {
  const userId = Number(req.params.id);

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User tidak ditemukan",
    });
  }

  res.json({
    status: "success",
    user,
  });
});
const HISTORY_FILE = "./data/history.json";

app.get("/history/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const histories = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));

  const userHistory = histories.filter((item) => item.userId === userId);

  res.json({
    status: "success",
    histories: userHistory,
  });
});

// endpoint history
app.post("/save-project", (req, res) => {
  const project = req.body;

  const histories = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));

  histories.push(project);

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(histories, null, 2));

  res.json({
    status: "success",
    message: "Proyek berhasil disimpan",
  });
});
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
