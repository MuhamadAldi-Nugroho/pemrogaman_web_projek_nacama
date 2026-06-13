function showSuccess(title, text) {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
    customClass: {
      popup: "nacama-popup",
      confirmButton: "nacama-confirm",
    },
  });
}

function showError(title, text) {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Tutup",
    customClass: {
      popup: "nacama-popup",
      confirmButton: "nacama-confirm",
    },
  });
}

function showConfirm(title, text, callback) {
  Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
    customClass: {
      popup: "nacama-popup",
      confirmButton: "nacama-confirm",
      cancelButton: "nacama-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}
