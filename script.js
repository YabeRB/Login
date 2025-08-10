function showForm(formId) {
    document.querySelectorAll(".form").forEach(form => {
        form.classList.remove("active");
    });
    document.getElementById(`${formId}-form`).classList.add("active");
}

document.querySelector(".google").addEventListener("click", () => {
    alert("Integración real de Google requiere backend (OAuth)");
});
document.querySelector(".github").addEventListener("click", () => {
    alert("Integración real de GitHub requiere backend (OAuth)");
});
document.querySelector(".hotmail").addEventListener("click", () => {
    alert("Integración real de Hotmail requiere backend (OAuth)");
});
