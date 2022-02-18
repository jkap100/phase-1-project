//**Selectors */
const form = document.querySelector("#searchForm");
const movieDiv = document.querySelector("#movie-list");
const clearFormBtn = document.querySelector("#clear-form");
const commentDiv = document.querySelector("#comment-div");
const likesDiv = document.querySelector("#likes-div");

//**Listeners */
clearFormBtn.addEventListener("click", () => {
  movieDiv.innerHTML = "";
  commentDiv.innerHTML = "";
  likesDiv.innerHTML = "";
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  makeImages(res.data);

  form.elements.query.value = "";
});

//**Renderings  */
const makeImages = (shows) => {
  // console.log(shows);
  movieDiv.innerHTML = "";
  commentDiv.innerHTML = "";
  likesDiv.innerHTML = "";

  for (let result of shows) {
    if (result.show.image) {
      const movieSpan = document.createElement("span");
      const newImg = document.createElement("img");
      const movieTitle = document.createElement("h5");
      const movieRating = document.createElement("h6");
      let originalImg = document.createElement("img");
      let runtime = document.createElement("p");
      runtime.classList = `runtime`;
      let description = document.createElement("p");
      description.classList = `desc`;
      let network = document.createElement("p");
      const rawScore = result.score * 100;
      const score = rawScore.toFixed(1);

      movieTitle.innerText = `${result.show.name}`;
      movieRating.textContent = `Rating: ${score}`;
      // console.log(movieRating);

      newImg.src = result.show.image.medium;
      originalImg = result.show.image.original;
      runtime.textContent = `Runtime: ${result.show.runtime} minutes`;
      description.innerHTML = `${result.show.summary}`;

      movieDiv.append(movieSpan);
      movieSpan.append(newImg, movieTitle);
      movieTitle.append(movieRating);

      newImg.addEventListener(
        "click",
        (e) =>
          handleSelectMovie(e, movieSpan, originalImg, runtime, description),
        { once: true }
      );
    }
  }
};

//**Handlers */
function handleSelectMovie(e, movieSpan, originalImg, runtime, description) {
  const commentForm = document.createElement("form");
  const showSearch = document.querySelector("#show-search");
  let image = document.querySelector("img");
  const likes = document.createElement("span");
  let minutes = runtime.textContent.split(" ")[1];

  movieDiv.innerHTML = "";

  // image.classList.add("d-flex justify-content-evenly")
  movieDiv.append(movieSpan);

  // console.log(minutes);
  if (minutes == "null") {
    movieSpan.append(description);
  } else {
    movieSpan.append(runtime, description);
  }

  image.src = originalImg;

  likes.id = "likes";
  likes.innerHTML = `  
      <div class="likes-section">
      <span id="like-count" class="likes">${0} Likes</span>
      <button type="click" id="like-button" class="btn btn-secondary">♥</button>
      </div>`;

  commentForm.id = "comment-form";
  commentForm.innerHTML = `
      <h4>Comments:</h4>
      <ul id="comment-list"></ul>
      <input name="newComment" type="text" placeholder="Add comment"/>
      <button type="submit" id="comment-btn"  class="btn btn-secondary"/>Add Comment</button>
   `;

  likesDiv.append(likes);
  commentDiv.append(commentForm);

  likeBtn = document.querySelector("#like-button");

  likeBtn.addEventListener("click", handleLikes);
  commentForm.addEventListener("submit", handleNewComment);
}

function handleLikes() {
  // console.log("test");
  const likes = document.querySelector("#like-count");
  let count = Number(likes.textContent.split(" ")[0]);
  count++;
  likes.innerText = count + " likes";
}

function handleNewComment(e) {
  e.preventDefault();
  // console.log(e);
  const commentUl = document.querySelector("#comment-list");
  const commentLi = document.createElement("li");

  commentLi.textContent = e.target.newComment.value;

  commentUl.appendChild(commentLi);

  e.target.reset();
}
