document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("9RbISARI1TN8KjLWN"); // Replace with your EmailJS public key

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Collect form data
    const formData = {
      subject: document.getElementById("subject").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Send email via EmailJS
    emailjs
      .send("service_rpyx8ql", "template_ze4sc95", formData)
      .then((response) => {
        alert("Message sent successfully!");
        form.reset(); // Clear the form
      })
      .catch((error) => {
        alert("Failed to send message. Try again later.");
        console.error("Error:", error);
      });
  });
});
