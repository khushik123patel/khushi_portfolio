// script.js
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const nameInput = contactForm.querySelector("input[name='name']");
  const emailInput = contactForm.querySelector("input[name='email']");
  const messageInput = contactForm.querySelector("textarea[name='message']");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully ✅");
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } else {
        alert("Failed to send message ❌");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
  });
}