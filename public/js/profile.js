// ======================
// CEK LOGIN
// ======================

const user = JSON.parse(sessionStorage.getItem("user"));

if (!user) {
  window.location.href = "Login.html";
}

// ======================
// LOAD DATA USER
// ======================

document.getElementById("name").value = user.name || "";

document.getElementById("email").value = user.email || "";

document.getElementById("phone").value = user.phone || "";

document.getElementById("jobTitle").value = user.jobTitle || "";

document.getElementById("company").value = user.company || "";

document.getElementById("website").value = user.website || "";

// ======================
// HEADER PROFILE
// ======================

document.getElementById("profileName").textContent = user.name;

document.getElementById("profileJob").textContent = user.jobTitle || "Belum diisi";

document.getElementById("avatar").textContent = user.name.charAt(0).toUpperCase();

// ======================
// CARD PREVIEW
// ======================

updatePreview();

// ======================
// UPDATE PREVIEW
// ======================

function updatePreview() {
  document.getElementById("avatar").textContent = document.getElementById("name").value.charAt(0).toUpperCase();

  document.getElementById("profileName").textContent = document.getElementById("name").value;

  document.getElementById("profileJob").textContent = document.getElementById("jobTitle").value || "Belum diisi";
}

// realtime preview

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", updatePreview);
});

// ======================
// SIMPAN PROFILE
// ======================

async function saveProfile() {
  try {
    const response = await fetch("/update-profile", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: user.id,

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        jobTitle: document.getElementById("jobTitle").value,

        company: document.getElementById("company").value,

        website: document.getElementById("website").value,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(data.user));

      alert("Profile berhasil diperbarui");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
}

// ======================
// LOGOUT
// ======================

function logout() {
  if (confirm("Yakin ingin logout?")) {
    sessionStorage.removeItem("user");

    window.location.href = "Login.html";
  }
}
