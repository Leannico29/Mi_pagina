document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || subject === "" || message === "") {
        formMessage.textContent = "Por favor, complete todos los campos.";
        formMessage.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = "Por favor, ingrese un correo electrónico válido.";
        formMessage.style.color = "red";
        return;
    }

    if (message.length < 10) {
        formMessage.textContent = "El mensaje debe contener al menos 10 caracteres.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Formulario enviado correctamente.";
    formMessage.style.color = "green";

    document.getElementById("contactForm").reset();
});
