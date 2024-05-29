const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
  }
};

async function fetchGenres() {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR', options);
  const data = await response.json();
  const genreMap = new Map();
  data.genres.forEach(genre => {
    genreMap.set(genre.id, genre.name);
  });
  return genreMap;
}

async function fetchMovies(page = 1) { // Updated to accept a page parameter (line updated)
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}`, options); // Updated to use the page parameter (line updated)
  const data = await response.json();
  return data;
}

async function displayMovies() {
  try {
    const genreMap = await fetchGenres();
    let movies = []; // Changed from const to let to allow reassignment (line updated)
    let page = 1; // Added to keep track of the current page (line added)
    let data = await fetchMovies(page); // Initial fetch with page 1 (line updated)
    const filterDate = new Date('2024-06-01');

    while (page <= data.total_pages) { // Loop through all pages (line added)
      data = await fetchMovies(page); // Fetch movies for the current page (line added)
      movies = movies.concat(data.results); // Concatenate new results to movies array (line updated)
      page++; // Increment the page counter (line added)
    }

    let tag = '';
    movies.forEach(movie => {
      const releaseDate = new Date(movie.release_date);
      if (releaseDate >= filterDate) {
        const genreNames = movie.genre_ids.map(id => genreMap.get(id)).join(', ');
        tag += `
          <div class="movie">
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>원제: ${movie.original_title}</p>                
            <p>월드 개봉일: ${movie.release_date}</p>
            <p>줄거리: ${movie.overview}</p>
            <p>장르: ${genreNames}</p>                
            <p>인기도: ${movie.popularity}</p>
            <p>평점: ${movie.vote_average}</p>
            <p>평점 입력 수: ${movie.vote_count}</p>                
          </div>
        `;
      }  
    });

    document.querySelector('.result').innerHTML = tag;
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => {
  displayMovies();
}
