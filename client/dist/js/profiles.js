profiles = document.querySelector(".profiles");

if (localStorage.getItem("token")) {
  document.querySelector(
    ".login"
  ).innerHTML = `<a  href="login.html" onclick='logout()'>Logout</a></li>`;
}

fetchAPI("/profile", "get", null, async ({ data, status }) => {
  if (status === 400) {
    location.href = "profiles.html";
  } else if (status === 401) {
    checkToken(data.msg);
  } else if (status === 200) {
    console.log(data);
    var skillNo = 1;
    data.forEach(data => {
      profiles.innerHTML += `<div class="profile bg-light">
      <img
        class="round-img"
        src= ${data.user.avatar}
      />
      <div>
      <h2>${data.user.name}</h2>
        ${checkProfile(data)}

        <p>${data.location}</p>
        <a href="profile.html" class="btn btn-primary" onClick="getClickedId(event,
          '${data.user._id}','profile.html')">
          View Profile
        </a>
      </div>
      <ul class = 'skills${skillNo}'>

      </ul>
    </div>;`;

      data.skills.forEach(skill => {
        document.querySelector(
          `.skills${skillNo}`
        ).innerHTML += `<li class="text-secondary">
      <i class="fas fa-check" />${skill}
    </li>`;
      });
      skillNo += 1;
    });
  }
});
