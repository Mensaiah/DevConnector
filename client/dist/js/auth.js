var newUserLinks = ["login.html", "index.html", "register.html"];

var IsNewUserLink = newUserLinks.some(element =>
  location.href.endsWith(element)
);

if (IsNewUserLink && localStorage.token) {
  location.href = "dashboard.html";
}
