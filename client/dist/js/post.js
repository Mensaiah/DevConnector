const postId = localStorage.clickedProfile;
const button = document.querySelector("input");
const textArea = document.querySelector("textarea");

fetchAPI(`/posts/${postId}`, "GET", null, ({ data, status }) => {
  if (status === 400) {
    showError(alert, data.errors.msg);
  } else if (status === 200) {
    console.log(data);
    button.onclick = addComment(event, `${data._id}`);
    const postDiv = document.querySelector(".post");
    postDiv.innerHTML = `<div>
    <a href="profile.html">
      <img
        class="round-img"
        src="${data.avatar}"
        alt=""
      />
      <h4>${data.name}</h4>
    </a>
  </div>
  <div>
    <p class="my-1">
      ${data.text}
    </p>
  </div>`;

    if (data.comments.length > 0) {
      const comments = document.querySelector(".comments");
      data.comments.forEach(comment => {
        comments.innerHTML += `<div class="post comment bg-white p-1 my-1">
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
          </div>
          </div>`;
      });
    }

    function addComment(event, dataId) {
      //   event.preventDefault();
      const text = textArea.value;
      const commentText = {
        text
      };
      fetchAPI(
        `/posts/comment/${dataId}`,
        "POST",
        commentText,
        ({ data, status }) => {
          if (status === 400) {
            showError(alert, data.errors.msg);
          } else if (status === 200) {
            console.log(data);

            //   location.href = "post.html";
          }
        }
      );
    }
  }
});
