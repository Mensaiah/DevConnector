// Get Input data
const status = document.getElementById("status"),
  alert = document.querySelector("alert"),
  company = document.getElementById("company"),
  website = document.getElementById("website"),
  locationData = document.getElementById("location"),
  skills = document.getElementById("skills"),
  githubusername = document.getElementById("githubusername"),
  bio = document.getElementById("bio"),
  twitterurl = document.getElementById("twitterurl"),
  facebookurl = document.getElementById("facebookurl"),
  youtubeurl = document.getElementById("youtubeurl"),
  linkedinurl = document.getElementById("linkedinurl"),
  instagramurl = document.getElementById("instagramurl");

fetchAPI("/profile/me", "get", null, ({ data, status }) => {
  if (status === 400) {
  } else if (status === 200) {
    console.log(data);
    if (data.profile) {
      company.value = data.company;
      website.value = data.website;
      locationData.value = data.location;
      bio.value = data.bio;
      status.value = data.status;
      githubusername.value = data.githubusername;
      skills.value = data.skills;
      youtubeurl.value = data.youtube;
      facebookurl.value = data.facebook;
      twitterurl.value = data.twitter;
      instagramurl.value = data.instagram;
      linkedinurl.value = data.linkedin;
    }
  }
});

document.getElementById("submit").addEventListener("click", e => {
  e.preventDefault();

  const profileData = {
    company: company.value,
    website: website.value,
    location: locationData.value,
    bio: bio.value,
    status: status.value,
    githubusername: githubusername.value,
    skills: skills.value,
    youtube: youtubeurl.value,
    facebook: facebookurl.value,
    twitter: twitterurl.value,
    instagram: instagramurl.value,
    linkedin: linkedinurl.value
  };

  fetchAPI("/profile", "post", profileData, ({ data, status }) => {
    if (status === 400) {
      alert.innerHTML = data.msg;
      alert.hidden = false;
      setTimeout(() => {
        alert.hidden = true;
      }, 2000);
    } else if (status === 200) {
      location.href = "dashboard.html";
    }
  });
});
