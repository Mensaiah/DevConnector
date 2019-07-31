const posts = document.querySelector(".posts");

fetchAPI("/posts", "Get", null, ({ data, status }) => {
  if (status === 400) {
    console.log(data);
  } else if (status === 200) {
    console.log(data);

    data.forEach(post => {
      posts.innerHTML += ` 
      <div class="post bg-white my-1">
      
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
        <button class="btn"onClick='likePost(event,"${post._id}")' >
          <i class="fas fa-thumbs-up" ></i><span>${post.likes.length}</span>
        </button>
        <button class="btn" onClick='unlikePost(event,"${post._id}")'>
          <i class="fas fa-thumbs-down"></i> 
        </button>
        <a href="post.html" class="btn btn-primary py-1" onClick="getClickedId(event,
            '${post._id}', 'post.html'); ">Discussion</a>
      </div>
      <!--Alert-->
      <div class="alertDiv alert-danger" hidden></div>
    </div>`;
    });
  }
});

function likePost(event, id) {
  fetchAPI(`/posts/like/${id}`, "PUT", null, ({ data, status }) => {
    if (status === 400) {
      showError(alertDiv, data.msg);
    } else {
      location.href = "posts.html";
    }
  });
}

function unlikePost(event, id) {
  fetchAPI(`/posts/unlike/${id}`, "PUT", null, ({ data, status }) => {
    if (status === 400) {
      showError(alertDiv, data.msg);
    } else {
      location.href = "posts.html";
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
