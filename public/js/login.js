function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    showError("Form Belum Lengkap", "Email dan Password wajib diisi!");

    return;
  }

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA LOGIN:", data);

      if (data.status === "success") {
        showSuccess("Login Berhasil", data.message);

        sessionStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        showError("Login Gagal", data.message);
      }
    })
    .catch((err) => {
      showError("Server Error", "Gagal terhubung ke server");

      console.log(err);
    });
}
