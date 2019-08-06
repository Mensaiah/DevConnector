const username = document.querySelector(".name"),
  img = document.querySelector(".img"),
  job = document.querySelector(".lead"),
  jobLocation = document.querySelector(".job-location"),
  website = document.querySelector(".website"),
  facebook = document.querySelector(".facebook"),
  twitter = document.querySelector(".twitter"),
  instagram = document.querySelector(".instagram"),
  linkedin = document.querySelector(".linkedin"),
  bioHead = document.querySelector(".bio-head"),
  bio = document.querySelector(".bio"),
  edu = document.querySelector(".education"),
  exp = document.querySelector(".experience"),
  skills = document.querySelector(".skills"),
  githubProfile = document.querySelector(".profile-github");
var correctUser;
if (localStorage.clickedProfile === localStorage.userId) {
  correctUser = "/me";
} else {
  correctUser = `/user/${localStorage.clickedProfile}`;
}

fetchAPI("/profile" + correctUser, "get", null, ({ data, status }) => {
  if (status === 401) {
    location.href = "login.html";
  } else if (status === 401) {
    checkToken(data.msg);
  } else if (status === 200) {
    console.log(data);
    job.innerHTML = `${data.status} at ${data.company}`;
    jobLocation.innerHTML = data.location;
    username.innerHTML = data.user.name;
    img.src = data.user.avatar;
    website.href = `http://${data.website}`;

    facebook.href = `http://${data.social.facebook}`;
    instagram.href = `http://${data.social.instagram}`;
    twitter.href = `http://${data.social.twitter}`;
    linkedin.href = `http://${data.social.linkedin}`;
    data.skills.forEach(skill => {
      skills.innerHTML += `<div class="p-1"><i class="fas fa-check"></i>${skill}</div>`;
    });
    const name = data.user.name.split(" ");
    const firstName = name[0];
    bioHead.innerHTML = `${firstName}'s Bio`;
    bio.innerHTML = ifUndefined(data.bio);

    data.experience.forEach(experience => {
      exp.innerHTML = "";
      exp.innerHTML += `<h3>${experience.title}</h3>
      <p>${formatDate(experience.from)} - ${checkIfCurrent(experience)}</p>
      <p><strong>Company: </strong> ${experience.company}</p>
      <p>
        <strong>Description: </strong> ${experience.description}
      </p>
    </div>`;
    });

    data.education.forEach(education => {
      edu.innerHTML = "";
      edu.innerHTML += ` <h3>${education.school}</h3>
      <p>${formatDate(education.from)} - ${checkIfCurrent(education)}</p>
      <p><strong>Degree: </strong> ${education.degree}</p>
      <p><strong>Field Of Study: </strong> ${education.fieldofstudy}</p>
      <p>
        <strong>Description: </strong> ${education.description}
      </p>`;
    });
  }

  fetchAPI(
    `/profile/github/${data.githubusername}`,
    "GET",
    null,
    ({ data, status }) => {
      if (status === 400) {
        githubProfile.innerHTML = `<h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2><div class="repo bg-white my-1 p-1">${data.msg}</div> `;
      } else if (status === 401) {
        checkToken(data.msg);
      } else if (status === 200) {
        data.forEach(repo => {
          githubProfile.innerHTML += ` <div class="repo bg-white my-1 p-1">
          <div>
            <h4><a href="${repo.html_url}">${repo.name}</a></h4>
            <p>
             ${ifUndefined(repo.description)}
            </p>
          </div>
          <div>
            <ul>
              <li class="badge badge-primary">Stars: ${
                repo.stargazers_count
              }</li>
              <li class="badge badge-dark">Watchers: ${repo.watchers}</li>
              <li class="badge badge-light">Forks:${repo.forks}</li>
            </ul>
          </div>
        </div>`;
        });
      }
    }
  );
});
