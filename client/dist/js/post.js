const postId = localStorage.clickedProfile;

fetchAPI(`/posts/${postId}`, "GET", null, ({ data, status }) => {
  if (status === 400) {
    showError(alert, data.errors.msg);
  } else if (status === 401) {
    checkToken(data.msg);
  } else if (status === 200) {
    console.log(data);
    const postDiv = document.querySelector(".post");
    postDiv.innerHTML = `<div>
    <a href="profile.html">
      <img
        class="round-img"
        src="${data.avatar}"
        alt=""
      />
      <h4 class = "form-text">${data.name}</h4>
    </a>
  </div>
  <div>
    <p class="my-1">
      ${data.text}
    </p>
    <div><strong> Posted On ${formatDate(data.date)}</strong></div>
  </div>`;

    displayDiv(data.comments);
  }
});

function addComment(event, post_Id) {
  event.preventDefault();
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const text = formData.get("text");
  const commentText = {
    text
  };
  console.log(commentText);

  fetchAPI(
    `/posts/comment/${post_Id}`,
    "POST",
    commentText,
    ({ data, status }) => {
      if (status === 400) {
        showError(alert, data.errors.msg);
      } else if (status === 401) {
        checkToken(data.msg);
      } else if (status === 200) {
        document.querySelector("textarea").value = "";
        displayDiv(data);
        console.log(data);
      }
    }
  );
}

function displayDiv(commentArr) {
  var commentNum = 0;
  if (commentArr.length > 0) {
    const comments = document.querySelector(".comments");
    commentArr.forEach(comment => {
      commentNum++;
      comments.innerHTML += `<div class="post comment comment-${commentNum} bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src="${comment.avatar}"
            alt=""
          />
          <h4>${comment.name}</h4>
        </a>
      </div>
      <div>
        <p class="my-1">
        ${comment.text}
        </p>
        ${ifUser(
          localStorage.userId,
          comment.user,
          postId,
          comment._id,
          "posts",
          "comment",
          `.comment-${commentNum}`
        )}
      </div>
      </div>
   `;
    });
  }
}
