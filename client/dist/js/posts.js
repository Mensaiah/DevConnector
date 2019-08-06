const posts = document.querySelector(".posts");
const alertDiv = document.querySelector(".alert");
let postNum = 1;

fetchAPI("/posts", "Get", null, ({ data, status }) => {
  if (status === 400) {
  } else if (status === 401) {
    checkToken(data.msg);
  } else if (status === 200) {
    console.log(data);

    data.forEach(post => {
      posts.innerHTML += ` 
      <!--Alert-->
      <div class="alert alert-danger alert-${postNum}" hidden></div>
    </div>
      <div class="post bg-white my-1  p-1 post-${postNum}">
      
      <div>
        <a href="profile.html" onClick="getClickedId(event,
            '${post.user}','profile.html')">
        
          <img
            class="round-img"
            src="${post.avatar}"
            alt=""
          />
          <h4>${post.name}</h4>
        </a>
      </div>
      <div class="my-1">
        ${post.text}
        <div>
        
        <div><strong> Posted On ${formatDate(post.date)}</strong></div>
        <button class="btn"onClick='likePost("${post._id}", ${postNum})' >
          <i class="fas fa-thumbs-up" ></i> <span class = 'like-${postNum} '>${
        post.likes.length
      }</span>
        </button>
        <button class="btn unlike" onClick='unlikePost("${
          post._id
        }", ${postNum})'>
          <i class="fas fa-thumbs-down"></i> 
        </button>
        <a href="post.html" class="btn btn-primary my-1" onClick="getClickedId(event,
            '${post._id}', 'post.html')">Discussion</a>
        ${ifUser(
          localStorage.userId,
          post.user,
          post._id,
          "",
          "posts",
          "",
          `.post-${postNum}`
        )}
      </div>
      </div>
      `;
      postNum++;
    });
  }
});

function likePost(id, postNum) {
  fetchAPI(`/posts/like/${id}`, "PUT", null, ({ data, status }) => {
    if (status === 400) {
      const postAlert = document.querySelector(`.alert-${postNum}`);
      showError(postAlert, data.msg);
    } else if (status === 200) {
      const like = document.querySelector(`.like-${postNum}`);

      like.textContent = data.length;
    }
  });
}

function unlikePost(id, postNum) {
  fetchAPI(`/posts/unlike/${id}`, "PUT", null, ({ data, status }) => {
    if (status === 400) {
      const postAlert = document.querySelector(`.alert-${postNum}`);
      showError(postAlert, data.msg);
    } else if (status === 200) {
      const like = document.querySelector(`.like-${postNum}`);

      like.textContent = data.length;
    }
  });
}

function addPost(event) {
  event.preventDefault();
  postText = { text: document.querySelector("textarea").value };
  fetchAPI("/posts", "POST", postText, ({ data, status }) => {
    if (status === 400) {
      showError(alert, data.errors.msg);
    } else if (status === 200) {
      location.href = "posts.html";
    }
  });
}
