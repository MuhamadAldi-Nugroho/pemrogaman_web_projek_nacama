 window.addEventListener("pageshow", function (event) {
        if (event.persisted && !sessionStorage.getItem("reloaded")) {
          sessionStorage.setItem("reloaded", "true");
          location.reload();
        }
      });

      window.addEventListener("load", () => {
        sessionStorage.removeItem("reloaded");
      });
      // =========================
      // CEK STATUS LOGIN
      // =========================
      function checkLoginStatus() {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (user) {
          // Sembunyikan tombol Masuk & Daftar
          document.getElementById("nav-masuk").style.display = "none";
          document.getElementById("nav-daftar").style.display = "none";

          // Tampilkan user wrapper
          document.getElementById("nav-user").style.display = "block";

          // Isi nama di tombol & dropdown
          const nama = user.name || "User";
          document.getElementById("nav-username").textContent = nama;
          document.getElementById("dropdown-name").textContent = nama;
          document.getElementById("dropdown-email").textContent = user.email || "";

          // Buat inisial avatar (misal "Budi Agung" → "BA")
          const inisial = nama
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
          document.getElementById("nav-avatar").textContent = inisial;
        }
      }

      // =========================
      // TOGGLE DROPDOWN
      // =========================
      function toggleDropdown() {
        const wrapper = document.getElementById("nav-user");
        const btn = document.getElementById("user-btn");
        const isOpen = wrapper.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen);
      }

      // Tutup dropdown kalau klik di luar
      document.addEventListener("click", function (e) {
        const wrapper = document.getElementById("nav-user");
        if (wrapper && !wrapper.contains(e.target)) {
          wrapper.classList.remove("open");
          const btn = document.getElementById("user-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      // =========================
      // LOGOUT
      // =========================
      function logoutUser() {
        showConfirm("Logout", "Yakin ingin keluar dari akun?", () => {
          sessionStorage.removeItem("user");

          window.location.reload();
        });
      }
      // Jalankan saat halaman dimuat
      checkLoginStatus();
      // =========================
      // REGISTER
      // =========================
      function openRegister() {
        document.getElementById("registerModal").style.display = "flex";
      }

      function closeRegister() {
        document.getElementById("registerModal").style.display = "none";
      }

      window.onclick = function (event) {
        const modal = document.getElementById("registerModal");

        if (event.target === modal) {
          closeRegister();
        }
      };

      // =========================
      // REGISTER USER
      // =========================
      async function registerUser() {
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value.trim();

        if (!name || !email || !password) {
          showError("Form Belum Lengkap", "Semua field wajib diisi!");
          return;
        }
        try {
          const response = await fetch("/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            closeRegister();

            document.getElementById("reg-name").value = "";
            document.getElementById("reg-email").value = "";
            document.getElementById("reg-password").value = "";

            showSuccess("Registrasi Berhasil", data.message);
          } else {
            showError("Registrasi Gagal", data.message);
          }
        } catch (error) {
          console.error(error);
          showError("Server Error", "Gagal terhubung ke server");
        }
      }

      // =========================
      // BUKA REGIS DARI LOGIN
      // =========================
      window.addEventListener("load", () => {
        const params = new URLSearchParams(window.location.search);

        if (params.get("register") === "open") {
          openRegister();
        }
      });