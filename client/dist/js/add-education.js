const form = document.querySelector("form"),
  checkbox = document.querySelector(".checkbox");

form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(form);
  const school = formData.get("school");
  const degree = formData.get("degree");
  const fieldofstudy = formData.get("fieldofstudy");
  const from = formData.get("from");
  const to = formData.get("to");
  const description = formData.get("description");

  const credentials = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current: checkbox.checked,
    description
  };
  fetchAPI("/profile/education", "put", credentials, ({ data, status }) => {
    if (status === 400) {
      showError(alert, data.errors[0].msg);
    } else if (status === 401) {
      checkToken(data.msg);
    } else if (status === 200) {
      location.href = "dashboard.html";
    }
  });
});
