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
  } else if (status === 401) {
    checkToken(data.msg);
  } else if (status === 200) {
    console.log(data);
    if (data) {
      company.value = ifUndefined(data.company);
      website.value = ifUndefined(data.website);
      locationData.value = ifUndefined(data.location);
      bio.value = ifUndefined(data.bio);
      status.value = ifUndefined(data.status);
      githubusername.value = ifUndefined(data.githubusername);
      skills.value = ifUndefined(data.skills);
      youtubeurl.value = ifUndefined(data.social.youtube);
      facebookurl.value = ifUndefined(data.social.facebook);
      twitterurl.value = ifUndefined(data.social.twitter);
      instagramurl.value = ifUndefined(data.social.instagram);
      linkedinurl.value = ifUndefined(data.social.linkedin);
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
    } else if (status === 401) {
      checkToken(data.msg);
    } else if (status === 200) {
      location.href = "dashboard.html";
    }
  });
});
function toggleSocialInputs(e) {
  e.preventDefault();
  const socialDiv = document.querySelector(".socialDiv");
  socialDiv.toggleAttribute("hidden");
}
document
  .querySelector(".socialBtn")
  .addEventListener("click", toggleSocialInputs);
