const checkbox = document.querySelector(".checkbox");

const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();
  formData = new FormData(form);
  const title = formData.get("title");
  const location = formData.get("location");
  const company = formData.get("company");
  const from = formData.get("from");
  const to = formData.get("to");
  const description = formData.get("description");

  newExp = {
    title,
    location,
    company,
    from,
    to,
    current: checkbox.checked,
    description
  };

  fetchAPI("/profile/experience", "POST", newExp, ({ data, status }) => {
    if (status === 500) {
      showError(alert, data.errors.msg);
    } else if (status === 200) {
      location.href = "dashboard.html";
    }
  });
});
