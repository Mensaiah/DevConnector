const email = document.getElementById("email");
const password = document.getElementById("password");
const alert = document.querySelector(".alert");

document.getElementById("sumbit").addEventListener("click", e => {
  e.preventDefault();

  const body = {
    email: email.value,
    password: password.value
  };

  fetchAPI("/auth", "post", body, ({ data, status }) => {
    if (status === 400) {
      const responseErr = data.errors[0].msg;
      alert.innerHTML = responseErr;
      alert.hidden = false;
      setTimeout(() => {
        alert.hidden = true;
      }, 2000);
    } else if (status === 200) {
      localStorage.setItem("token", data.token);
      location.href = "dashboard.html";
    }
  });
});
