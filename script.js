let input = document.getElementById("search-box");
document.getElementById("search-btn").addEventListener("click", function () {
  let movieName = input.value;
  fetchMovies(movieName);
});

function fetchMovies(movieName) {
  let apiKey = "864d164c"; // Replace with your OMDb API key
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        displayMovies([]); // Show empty state for no results
      }
    })
    .catch((error) => console.log("Error:", error));
}

function displayMovies(movies) {
  let movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = ""; // Clear previous results

  if (!movies || movies.length === 0) {
    movieContainer.innerHTML = "<p>No movies found!</p>";
    return;
  }

  // Create document fragment for efficient DOM updates
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    fragment.appendChild(movieCard);
  });

  movieContainer.appendChild(fragment);
}

// Initial load with popular movies
window.addEventListener('load', function() {
  fetchMovies("action"); // Default search on page load
});