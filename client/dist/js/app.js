const BASE_URL = "/api";

function fetchAPI(route, method, data, cbFunction) {
  const h = new Headers();
  const token = localStorage.getItem("token");
  h.append("Content-type", "application/json");
  h.append("x-auth-token", token);

  fetch(BASE_URL + route, {
    method: method,
    headers: h,
    mode: "cors",
    body: data ? JSON.stringify(data) : undefined
  })
    .then(async response => {
      return {
        data: await response.json(),
        status: response.status
      };
    })
    .then(cbFunction)
    .catch(err => {
      console.log(err);
    });
}

// Show Error Div
function showError(alert, message) {
  alert = document.querySelector(".alert");
  alert.innerHTML = message;
  alert.hidden = false;
  setTimeout(() => {
    alert.hidden = true;
  }, 2000);
}

function checkIfCurrent(param) {
  if (param.current == true) {
    return "Current";
  } else {
    return param.to;
  }
}

// Get Id of Clicked Buttons
function getClickedId(event, clickedId, page) {
  event.preventDefault();
  if (!localStorage.token) {
    location.href = "login.html";
  } else {
    localStorage.setItem("clickedProfile", clickedId);
    location.href = page;
  }
}

function deleteOnClick(event, field, clickedId) {
  event.preventDefault();
  fetchAPI(
    `/profile/${field}/${clickedId}`,
    "delete",
    null,
    ({ data, status }) => {
      if (status === 400) {
      } else {
        location.href = "dashboard.html";
      }
    }
  );
}

function deleteUser(event, userId) {
  alert(confirm("Are you sure you want do this?...It cant be undone "));
  fetchAPI("/profile", "delete", null, ({ data, status }) => {
    event.preventDefault();
    logout();
    location.href = "login.html";
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("clickedProfile");
}

function checkProfile(data) {
  if (data.experience.length === 0) {
    return `<p >
    No Job Available
    </p>
    <p> No Location Available</p>`;
  } else {
    return `<p >
    ${data.experience[0].title} at ${data.experience[0].company}
    </p>`;
  }
}
// delete Exp and Edu
