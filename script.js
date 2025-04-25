const input = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const movieContainer = document.getElementById("movie-container");
const genres = [
  "harry",
  "avatar",
  "spider",
  "oppenheimer",
  "barbie",
  "john wick",
];

const apiKey = "864d164c"; // Votre clé API OMDb

function fetchInitialMovies() {
  const results = [];
  let totalFetched = 0;

  // Fonction pour fetch jusqu'à atteindre 25 films
  function fetchMore(index = 0) {
    if (index >= genres.length || totalFetched >= 25) {
      displayMovies(results.slice(0, 25)); // Max 25 films
      return;
    }

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genres[index]}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            if (totalFetched < 25) {
              results.push(movie);
              totalFetched++;
            }
          });
        } else {
          console.error("Erreur de l'API:", data.Error);
        }
        fetchMore(index + 1); // Passer au genre suivant
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données:", err);
        fetchMore(index + 1); // Passer au genre suivant en cas d'erreur
      });
  }

  fetchMore();
}

// Remplace window.onload
window.addEventListener("load", () => {
  fetchInitialMovies();
});

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p>Type: ${movie.Type}</p>
        <p>Year: ${movie.Year}</p>
    `;
    movieContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const movieName = input.value.trim();
  if (movieName) fetchMovies(movieName);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const movieName = input.value.trim();
    if (movieName) fetchMovies(movieName);
  }
});

function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        console.error("Erreur:", data.Error);
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
      <p> Type : ${movie.Type}</p>
      <p>Year: ${movie.Year}</p>
    `;
    fragment.appendChild(movieCard);
  });

  movieContainer.appendChild(fragment);
}

// Initial load with popular movies
window.addEventListener('load', function() {
  fetchMovies("action"); // Default search on page load

searchBtn.addEventListener("", function () {
  let movieName = input.value;
  fetchMovies(movieName);
});
});