window.addEventListener("pageshow", function (event) {
        if (event.persisted && !sessionStorage.getItem("reloaded")) {
          sessionStorage.setItem("reloaded", "true");
          location.reload();
        }
      });

      window.addEventListener("load", () => {
        sessionStorage.removeItem("reloaded");
      });
      function checkLoginStatus() {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (!user) return;

        document.getElementById("nav-masuk").style.display = "none";

        document.getElementById("nav-daftar").style.display = "none";

        document.getElementById("nav-user").style.display = "block";

        document.getElementById("nav-username").textContent = user.name;

        document.getElementById("dropdown-name").textContent = user.name;

        document.getElementById("dropdown-email").textContent = user.email;

        const initials = user.name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        document.getElementById("nav-avatar").textContent = initials;
      }

      function toggleDropdown() {
        const wrapper = document.getElementById("nav-user");

        const btn = document.getElementById("user-btn");

        const isOpen = wrapper.classList.toggle("open");

        btn.setAttribute("aria-expanded", isOpen);
      }

      document.addEventListener("click", function (e) {
        const wrapper = document.getElementById("nav-user");

        if (wrapper && !wrapper.contains(e.target)) {
          wrapper.classList.remove("open");

          const btn = document.getElementById("user-btn");

          if (btn) {
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });

      function logoutUser() {
        showConfirm("Logout", "Apakah Anda yakin ingin keluar?", () => {
          sessionStorage.removeItem("user");

          showSuccess("Berhasil", "Anda berhasil logout");

          setTimeout(() => {
            window.location.href = "../index.html";
          }, 1500);
        });
      }
      checkLoginStatus();
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        document.getElementById("historyLink").style.display = "none";

        document.querySelectorAll(".template-card").forEach((card) => {
          card.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            showConfirm("Belum Login", "Silakan login terlebih dahulu untuk menggunakan template.", () => {
              window.location.href = "../Login.html";
            });
            return false;
          });
        });
      }