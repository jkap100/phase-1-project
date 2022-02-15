const form = document.querySelector("#searchForm");
const movieDiv = document.querySelector("#movie-list");
const clearFormBtn = document.querySelector("#clear-form");
const commentDiv = document.querySelector("#comment-div");
const likesDiv = document.querySelector("#likes-div");

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

const makeImages = (shows) => {
  // console.log(shows);
  movieDiv.innerHTML = "";
  for (let result of shows) {
    if (result.show.image) {
      const movieSpan = document.createElement("span");
      const newImg = document.createElement("img");
      const movieTitle = document.createElement("p");
      const movieRating = document.createElement("p");
      let originalImg = document.createElement("img");
      let description = document.createElement("p");
      let network = document.createElement("p");
      let runtime = document.createElement("p");
      const rawScore = result.score * 100;
      const score = rawScore.toFixed(1);

      movieTitle.innerText = `Title: ${result.show.name}`;
      movieRating.textContent = `Rating: ${score}`;
      console.log(movieRating);

      newImg.src = result.show.image.medium;
      originalImg = result.show.image.original;
      description.innerHTML = `${result.show.summary}`;
      runtime.textContent = `Runtime: ${result.show.runtime} minutes`;

      movieDiv.append(movieSpan);
      movieSpan.append(newImg, movieTitle);
      movieTitle.append(movieRating);

      newImg.addEventListener("click", (e) =>
        handleSelectMovie(e, movieSpan, originalImg, description, runtime)
      );
    }
  }
};

//**Handlers */
function handleSelectMovie(e, movieSpan, originalImg, description, runtime) {
  const commentForm = document.createElement("form");
  const showSearch = document.querySelector("#show-search");
  let image = document.querySelector("img");
  const likes = document.createElement("span");

  movieDiv.innerHTML = "";

  movieDiv.append(movieSpan);
  movieSpan.append(description, runtime);

  image.src = originalImg;

  likes.id = "likes";
  likes.innerHTML = `  
      <div class="likes-section">
      <span id="like-count" class="likes">${0} likes</span>

      <button type="click" id="like-button" class="like-button">♥</button>
      </div>`;

  commentForm.id = "comment-form";
  commentForm.innerHTML = `
      <input type="text" placeholder="Add comment"/>
      <button type="submit" id="comment-btn"/>Add Comment</button>
      <ul id="comment-list"></ul>
  `;

  likesDiv.append(likes);
  commentDiv.append(commentForm);

  likeBtn = document.querySelector("#like-button");

  likeBtn.addEventListener("click", handleLikes);
  commentForm.addEventListener("submit", handleNewComment);
}

function handleLikes() {
  console.log("test");
}

function handleNewComment(e) {
  e.preventDefault();
  console.log(e);
}

// likesBtn.addEventListener("click", incrementLikes);

// function incrementLikes() {
//   let count = Number(likes.textContent.split(" ")[0]);
//   count++;
//   likes.innerText = count + " likes";
// }
