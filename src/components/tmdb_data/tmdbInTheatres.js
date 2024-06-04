const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzllZWUzZDc2ZWYwNzc2YzdjNWU4NzhlZGU0Y2ZiYSIsInN1YiI6IjY2NTQ3OWY5MjRhYWUyMmQxNDA2YWU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IroFQnlLfL2sSmvWkWAfFe8twYdSUZSoCGd_DN5V2iQ'
  }
};


async function fetchMovies() {
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options);
  const data = await response.json();
  return data.results;
}

async function displayMovies() {
  try {
    const movies = await fetchMovies();
    let tag = '';
    movies.forEach(movie => {
      tag += `
        <div class="movie">
          <h2>${movie.title}</h2>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <p>원제: ${movie.original_title}</p>                
          <p>월드 개봉일: ${movie.release_date}</p>
          <p>줄거리: ${movie.overview}</p>
          <p>장르: ${movie.genre_ids}</p>                
          <p>인기도: ${movie.popularity}</p>
          <p>평점: ${movie.vote_average}</p>
          <p>평점 입력 수: ${movie.vote_count}</p>                
        </div>
      `;
    });

    document.querySelector('.result').innerHTML = tag;
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => {
  displayMovies();
}