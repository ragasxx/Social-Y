{
  // method to submit the form data using ajax req

  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();

  //    method to create a post using ajax req

  let newPostDom = function (post) {
    return $(`
        
     <li id="post-${post._id}">
  <p>
   ${post.content}
   <small>
      <a href="/posts/destroy/${post.id}">DELETE</a>
    </small>
    
    <br />
    <br />
    <small> - ${post.user.name} </small>
  </p>

  <div class="post-comments">
  
    <form action="/comments/create" method="POST" class="formforcomments">
      <input
        type="text"
        name="content"
        placeholder="Type Here to add comment..."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>

   

    <div class="post-comments-list">
      <ul id="post-comments-${post._id}">
      
      </ul>
    </div>
  </div>
</li>
     
     
     `);
  };
}
