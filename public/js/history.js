// =========================
// CEK STATUS LOGIN
// =========================
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
//fungsi delete history
async function deleteHistory(id) {
  showConfirm("Hapus Riwayat", "Yakin ingin menghapus desain ini?", async () => {
    try {
      const response = await fetch(`/history/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.status === "success") {
        showSuccess("Berhasil", "Riwayat berhasil dihapus");

        loadHistory();
      } else {
        showError("Gagal", data.message);
      }
    } catch (err) {
      console.error(err);

      showError("Error", "Terjadi kesalahan pada server");
    }
  });
}

// Jalankan saat halaman dimuat
checkLoginStatus();
async function loadHistory() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) return;

  const response = await fetch(`/history/${user.id}`);

  const data = await response.json();

  const container = document.getElementById("historyContainer");

  if (data.histories.length === 0) {
    container.innerHTML = `
      <p style="text-align:center">
        Belum ada riwayat desain
      </p>
    `;
    return;
  }

  container.innerHTML = `
    <div class="content-container">
    <div class="template-grid"></div>
  </div>
  `;

  const grid = container.querySelector(".template-grid");

  data.histories.forEach((item) => {
    grid.innerHTML += `
      
    
      <a href="template/editing_template/editing_template.html?template=${item.template}" class="template-card">
    <button
    class="delete-btn"
    onclick="event.preventDefault(); event.stopPropagation(); deleteHistory(${item.id})"
    title="Hapus desain"
  >
    🗑
  </button>
        ${generatePreview(item)}

        <div class="card-footer">
          <span class="card-title">
            ${item.name}
          </span>
        </div>

      </a>
      
    `;
  });
}
function generatePreview(item) {
  if (item.template === "minimal") {
    return `
      <div class="card-preview card-minimal">
        <div class="preview-content centered">

          <div class="p-name dark-text">
            ${item.name}
          </div>

          <div class="p-title dark-text font-serif">
            ${item.title}
          </div>

          <div class="p-divider"></div>

          <div class="p-info sub-dark">
            ${item.company}
          </div>

          <div class="p-info sub-dark">
            ${item.phone}
          </div>

          <div class="p-info sub-dark">
            ${item.email}
          </div>

          <div class="p-info sub-dark">
            ${item.web}
          </div>

        </div>
      </div>
    `;
  }

  if (item.template === "classic") {
    return `
      <div class="card-preview card-classic">
        <div class="preview-content">

          <div class="p-name">
            ${item.name}
          </div>

          <div class="p-title">
            ${item.title}
          </div>

          <div class="p-info">
            ${item.phone}
          </div>

          <div class="p-info">
            ${item.email}
          </div>

          <div class="p-info">
            ${item.web}
          </div>

          <div class="p-company side-text">
            ${item.company}
          </div>

        </div>
      </div>
    `;
  }
  if (item.template === "gold") {
    return `
      <div class="card-preview card-gold">
        <div class="preview-content">

          <div class="p-name">
            ${item.name}
          </div>

          <div class="p-title">
            ${item.title}
          </div>

          <div class="p-info">
            ${item.phone}
          </div>

          <div class="p-info">
            ${item.email}
          </div>

          <div class="p-info">
            ${item.web}
          </div>

          <div class="p-company side-text">
            ${item.company}
          </div>

        </div>
      </div>
    `;
  }
  if (item.template === "neon") {
    return `
      <div class="card-preview card-neon">
        <div class="preview-content">

          <div class="p-name">
            ${item.name}
          </div>

          <div class="p-title">
            ${item.title}
          </div>

          <div class="p-info">
            ${item.phone}
          </div>

          <div class="p-info">
            ${item.email}
          </div>

          <div class="p-info">
            ${item.web}
          </div>

          <div class="p-company side-text">
            ${item.company}
          </div>

        </div>
      </div>
    `;
  }
  if (item.template === "geometric") {
    return `
      <div class="card-preview card-geometric">
        <div class="preview-content">

          <div class="p-name">
            ${item.name}
          </div>

          <div class="p-title">
            ${item.title}
          </div>

          <div class="p-info">
            ${item.phone}
          </div>

          <div class="p-info">
            ${item.email}
          </div>

          <div class="p-info">
            ${item.web}
          </div>

          <div class="p-company side-text">
            ${item.company}
          </div>

        </div>
      </div>
    `;
  }
  if (item.template === "bold") {
    return `
      <div class="card-preview card-bold">
        <div class="preview-content center-left">

          <div class="p-company-top">
            ${item.company}
          </div>

          <div class="p-name">
            ${item.name}
          </div>

          <div class="p-title-sub">
            ${item.title}
          </div>

          <div class="p-info-inline">
            ${item.phone}
          </div>

        </div>
      </div>
    `;
  }

  return `
    <div class="card-preview card-minimal">
      <div class="preview-content centered">
        <div class="p-name dark-text">
          ${item.name}
        </div>
      </div>
    </div>
  `;
}
loadHistory();

function logoutUser() {
  showConfirm("Logout", "Apakah Anda yakin ingin keluar?", () => {
    sessionStorage.removeItem("user");

    showSuccess("Berhasil", "Anda berhasil logout");

    setTimeout(() => {
      window.location.reload();
      window.location.href = "index.html";
    }, 1500);
  });
}
function checkAuth() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    window.location.replace("../../index.html");
  }
}

checkAuth();

window.addEventListener("pageshow", checkAuth);
