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
  // alert = document.querySelector(".alert");
  alert.innerHTML = message;
  alert.hidden = false;
  setTimeout(() => {
    alert.hidden = true;
  }, 2000);
}

function ifUndefined(data) {
  if (data == undefined) {
    return "";
  } else {
    return data;
  }
}

// Check Token
function checkToken(data) {
  if (data === "Token not valid") {
    logout();
  }
}

function checkIfCurrent(param) {
  if (param.current == true) {
    return "Current";
  } else {
    return formatDate(param.to);
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

function deleteOnClick(event, area, field, clickedId, clickedId2, parentDiv) {
  event.preventDefault();
  fetchAPI(
    `/${area}/${field}/${clickedId}/${clickedId2}`,
    "delete",
    null,
    ({ data, status }) => {
      if (status === 400) {
      } else {
        console.log(parentDiv);

        document.querySelector(parentDiv).remove();
      }
    }
  );
}

function deleteUser() {
  confirm("Are you sure you want do this?");
  fetchAPI("/profile", "delete", null, ({ data, status }) => {
    logout();
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("clickedProfile");
  location.href = "login.html";
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

function formatDate(thedate) {
  const date = new Date(thedate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

function ifUser(userId, user, id, id2, route, route2, div) {
  if (userId == user) {
    return `<button class = "btn btn-danger" onclick ='deleteOnClick(event,"${route}","${route2}", "${id}",  "${id2}",
    "${div}")'><i class="fa fa-trash" aria-hidden ="true"></i></button>`;
  } else {
    return "";
  }
}
