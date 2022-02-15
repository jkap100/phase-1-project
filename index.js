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

      movieTitle.innerText = `Title: ${result.show.name}`;
      movieRating.textContent = `Rating: ${result.score}`;
      console.log(movieRating);

      newImg.src = result.show.image.medium;
      originalImg = result.show.image.original;
      description.innerHTML = `${result.show.summary}`;
      runtime.textContent = `Runtime: ${result.show.runtime}`;

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

  let image = document.querySelector("img");

  movieDiv.innerHTML = "";

  movieDiv.append(movieSpan);
  movieSpan.append(description, runtime);

  image.src = originalImg;
}
