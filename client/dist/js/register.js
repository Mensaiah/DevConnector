const form = document.querySelector("form");
const alert = document.querySelector(".alert");

form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const comfirmPassword = formData.get("confirm-password");

  if (password !== comfirmPassword) {
    showError(alert, "Please check your passwords");
    console.log("Check Password");
  } else {
    const credentials = {
      name,
      email,
      password
    };
    console.log(credentials);

    fetchAPI("/users", "POST", credentials, ({ data, status }) => {
      if (status === 400) {
        showError(alert, data.error[0].msg);
      } else if (status === 200) {
        localStorage.token = data.token;
        location.href = "dashboard.html";
      }
    });
  }
});
