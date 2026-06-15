// reload halaman untuk mencegah cache saat kembali dari halaman lain
      window.addEventListener("pageshow", function (event) {
        if (event.persisted && !sessionStorage.getItem("reloaded")) {
          sessionStorage.setItem("reloaded", "true");
          location.reload();
        }
      });

      window.addEventListener("load", () => {
        sessionStorage.removeItem("reloaded");
      });
      const params = new URLSearchParams(window.location.search);
      const theme = params.get("template") || "classic";

      document.body.setAttribute("data-theme", theme);

      const themeInfo = {
        classic: { label: "Classic", badge: "Elegan" },
        bold: { label: "Bold", badge: "Modern" },
        minimal: { label: "Minimal", badge: "Bersih" },
        gold: { label: "Gold", badge: "Mewah" },
        neon: { label: "Neon", badge: "Futuristik" },
        geometric: { label: "Geometric", badge: "Kreatif" },
      };
      const info = themeInfo[theme] || themeInfo.classic;
      document.getElementById("panel-theme-name").textContent = info.label;
      document.getElementById("panel-badge").textContent = info.badge;
      document.getElementById("panel-badge").className = "panel-badge badge-" + theme;
      document.title = "Nacama - Edit " + info.label;

      const savedUser = sessionStorage.getItem("user");
      let currentUser = null;

      if (savedUser) {
        currentUser = JSON.parse(savedUser);

        const navMasuk = document.getElementById("nav-masuk");
        if (navMasuk) navMasuk.style.display = "none";

        document.getElementById("nav-user").style.display = "block";
        document.getElementById("nav-username").textContent = currentUser.name;
        document.getElementById("dropdown-name").textContent = currentUser.name;
        document.getElementById("dropdown-email").textContent = currentUser.email;

        const initials = currentUser.name
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
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      function logoutUser() {
        showConfirm("Logout", "Apakah Anda yakin ingin keluar?", () => {
          sessionStorage.removeItem("user");
          showSuccess("Berhasil", "Anda berhasil logout");
          setTimeout(() => {
            window.location.href = "../../index.html";
          }, 1500);
        });
      }

      const suffix =
        {
          classic: "",
          bold: "-bold",
          minimal: "-minimal",
          gold: "-gold",
          neon: "-neon",
          geometric: "-geo",
        }[theme] || "";

      const fieldMap = {
        name: ["preview-name" + suffix],
        title: ["preview-title" + suffix],
        company: ["preview-company" + suffix],
        phone: ["preview-phone" + suffix],
        email: ["preview-email" + suffix],
        web: ["preview-web" + suffix],
      };

      const defaults = {
        name: currentUser && currentUser.name ? currentUser.name : "Nama Lengkap",
        title: currentUser && currentUser.jobTitle ? currentUser.jobTitle : "JABATAN / POSISI",
        company: currentUser && currentUser.company ? currentUser.company : "NAMA PERUSAHAAN",
        phone: currentUser && currentUser.phone ? currentUser.phone : "+62 812-xxxx-xxxx",
        email: currentUser && currentUser.email ? currentUser.email : "nama@email.com",
        web: currentUser && currentUser.website ? currentUser.website : "www.website.com",
      };

      Object.keys(fieldMap).forEach((field) => {
        const input = document.getElementById("input-" + field);
        fieldMap[field].forEach((previewId) => {
          const el = document.getElementById(previewId);
          if (el) el.textContent = defaults[field];
        });
        if (input) {
          input.value = defaults[field];
          input.addEventListener("input", () => {
            fieldMap[field].forEach((previewId) => {
              const el = document.getElementById(previewId);
              if (el) el.textContent = input.value || defaults[field];
            });
            if (theme === "gold" && field === "name") {
              const initials = input.value
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
              const el = document.getElementById("preview-initials");
              if (el) el.textContent = initials || "NL";
            }
          });
        }
      });

      document.getElementById("btn-download").addEventListener("click", () => {
        const card = document.querySelector('.live-card-preview[class*="theme-' + theme + '"]');

        html2pdf()
          .set({
            margin: 0,
            filename: "kartu-nama-" + theme + ".pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true },
            jsPDF: {
              unit: "px",
              format: [340, 200],
              orientation: "landscape",
            },
          })
          .from(card)
          .save()
          .then(() => {
            showSuccess("PDF Berhasil Diunduh", "Kartu nama berhasil disimpan");
          });
      });
      document.getElementById("btn-save-project").addEventListener("click", saveProject);
//Ini cuma buat tes
      async function saveProject() {
        const currentUser = JSON.parse(sessionStorage.getItem("user"));

        if (!currentUser) {
          showError("Belum Login", "Silakan login terlebih dahulu untuk menyimpan proyek.");
          return;
        }

        async function saveProject() {
          try {
            const currentUser = JSON.parse(sessionStorage.getItem("user"));

            if (!currentUser) {
              showError("Belum Login", "Silakan login terlebih dahulu untuk menyimpan proyek.");
              return;
            }

            const projectData = {
              id: Date.now(),
              userId: currentUser.id,
              template: theme,

              name: document.getElementById("input-name").value,
              title: document.getElementById("input-title").value,
              company: document.getElementById("input-company").value,
              phone: document.getElementById("input-phone").value,
              email: document.getElementById("input-email").value,
              web: document.getElementById("input-web").value,

              createdAt: new Date().toISOString(),
            };

            const response = await fetch("/save-project", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (response.ok) {
              showSuccess("Proyek Disimpan", data.message);
            } else {
              showError("Gagal Menyimpan", data.message);
            }
          } catch (error) {
            console.error(error);

            showError("Server Error", "Tidak dapat terhubung ke server.");
          }
        }

        const projectData = {
          id: Date.now(),
          userId: currentUser.id,
          template: theme,

          name: document.getElementById("input-name").value,
          title: document.getElementById("input-title").value,
          company: document.getElementById("input-company").value,
          phone: document.getElementById("input-phone").value,
          email: document.getElementById("input-email").value,
          web: document.getElementById("input-web").value,

          createdAt: new Date().toISOString(),
        };

        const response = await fetch("http://localhost:3000/save-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        });

        const data = await response.json();

        if (response.ok) {
          showSuccess("Proyek Disimpan", data.message);
        } else {
          showError("Gagal Menyimpan", data.message);
        }
      }

      const user = JSON.parse(sessionStorage.getItem("user"));

      if (!user) {
        window.location.replace("../../index.html");
      }