const noProfile = document.querySelector(".no-profile"),
  fullProfile = document.querySelector(".full-profile"),
  alert = document.querySelector(".alert");
exp = document.querySelector(".experience");
edu = document.querySelector(".education");

fetchAPI("/auth", "get", null, ({ data, status }) => {
  if (status === 400) {
    location.href = "login.html";
  } else if (status === 200) {
    localStorage.setItem("userId", data._id);
    fetchAPI("/profile/me", "get", null, ({ data, status }) => {
      if (status === 400) {
        noProfile.hidden = false;
      } else if (status === 200) {
        fullProfile.hidden = false;
        if (data.experience.length === 0) {
          exp.innerHTML = ` <tr>
          <td class= "special">Not Available</td>
          <td class="hide-sm special">Not Available</td>
          <td class="hide-sm special">Not Available</td>
          <td>
            <a href='add-experience.html' class="btn btn-primary">
             Add Experience
            </a>
            </td>
          </tr> `;
        } else {
          data.experience.forEach(experience => {
            exp.innerHTML += `
            <tr>
            <td class= "special">${experience.company}</td>
            <td class="hide-sm special">${experience.title}</td>
            <td class="hide-sm special">${experience.from} - ${checkIfCurrent(
              experience
            )}</td>
            <td>
              <button class="btn btn-danger" onclick = "deleteOnClick(event,'experience','${
                experience._id
              }')">
                Delete
              </button>
            </td>
          </tr>
            `;
          });
        }

        if (data.education.length === 0) {
          edu.innerHTML = ` <tr>
          <td class= "special">Not Available</td>
          <td class="hide-sm special">Not Available</td>
          <td class="hide-sm special">Not Available</td>
          <td>
            <a href='add-education.html' class="btn btn-primary">
             Add Experience
            </a>
            </td>
          </tr> `;
        } else {
          data.education.forEach(education => {
            edu.innerHTML += `
            <tr>
            <td class= "special">${education.school}</td>
            <td class="hide-sm special">${education.degree}</td>
            <td class="hide-sm special">${education.from} - ${checkIfCurrent(
              education
            )}</td>
            <td>
              <button class="btn btn-danger" onclick = "deleteOnClick(event,'education','${
                education._id
              }')">
                Delete
              </button>
            </td>
          </tr>
            `;
          });
        }
      }
    });
  }
});
