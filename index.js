const form = document.querySelector("#searchForm");
const movieDiv = document.querySelector("#movie-list");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  makeImages(res.data);
  // console.log(res.data[0].show.image.medium);
  // const newImg = document.createElement('IMG');
  // newImg.src = res.data[0].show.image.medium;
  // document.body.append(newImg)
  form.elements.query.value = "";
});

const makeImages = (shows) => {
  console.log(shows);
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
      const scoreObj = result.score * 100;
      const score = scoreObj.toFixed(1);

      movieTitle.innerText = `Title: ${result.show.name}`;
      movieRating.textContent = `Rating: ${score}`;
      console.log(movieRating);

      newImg.src = result.show.image.medium;
      originalImg = result.show.image.original;
      description.innerHTML = `${result.show.summary}`;
      runtime.textContent = `Runtime: ${result.show.runtime} minutes`;

      //   movieDiv.append(movieTitle);
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
  console.log(e);
  console.log(movieSpan);

  const commentForm = document.createElement("form");
  const showSearch = document.querySelector("#show-search");

  let image = document.querySelector("img");

  movieDiv.innerHTML = "";

  movieDiv.append(movieSpan);
  movieSpan.append(description, runtime);

  image.src = originalImg;
}

// // Likes
// const likes = document.querySelector('#like-count')
// const likesBtn = document.querySelector('#like-button')

// likesBtn.addEventListener('click', incrementLikes)

// function incrementLikes(){
//     let count = Number(likes.textContent.split(" ")[0])
//     count++
//     likes.innerText = count + ' likes'
// }

// // Comments
// const commForm = document.querySelector('#comment-form')
// const cmntBtn = document.querySelector('#comment-btn')

// cmntBtn.addEventListener('submit', addComm)

// function addComm(e) {
//     e.preventDefault()
//     const content = e.target.comment.value
//     const imageId = Number(e.target.dataset.imgId)
//     const newComment = { imageId, content}

// }