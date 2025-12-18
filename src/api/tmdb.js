const myAPI = '1edace7527cba59a3d3c06f9b82e1e00';
const URL = 'https://api.themoviedb.org/3';

export const request = async (endpoint, params = '') => {
  const res = await fetch(
    `${URL}${endpoint}?api_key=${myAPI}&language=ko-KR${params}`
  );

  if (!res.ok) {
    throw new Error('Error');
  }

  return res.json();
};

// 오늘의 트렌드 컨텐츠( 영화, TV )
export const fetchTrendingContents = (page = 1) =>
  request('/trending/all/day', `&page=${page}`);

// 현재 상영중인 영화
export const fetchNowPlayingMovies = (page = 1) =>
  request('/movie/now_playing', `&page=${page}`);

// 인기있는 영화
export const fetchPopularMovies = (page = 1) =>
  request('/movie/popular', `&page=${page}`);

// 평정이 높은 영화
export const fetchTopRatedMovies = (page = 1) =>
  request('/movie/top_rated', `&page=${page}`);

// 개봉 예정 영화
export const fetchUpcomingMovies = (page = 1) =>
  request('/movie/upcoming', `&page=${page}`);

// 오늘 방송되는 TV 시리즈
export const fetchAiringTodayTV = (page = 1) =>
  request('/tv/airing_today', `&page=${page}`);

// 현재 방영중인 TV 시리즈
export const fetchOnTheAirTV = (page = 1) =>
  request('/tv/on_the_air', `&page=${page}`);

// 인기있는 TV 시리즈
export const fetchPopularTV = (page = 1) =>
  request('/tv/popular', `&page=${page}`);

// 평점높은 TV 시리즈
export const fetchTopRatedTV = (page = 1) =>
  request('/tv/top_rated', `&page=${page}`);

// 영화 상세 (tagline용)
export const fetchMovieDetail = (movieId) => request(`/movie/${movieId}`);

// TV 상세 (tagline용)
export const fetchTVDetail = (tvId) => request(`/tv/${tvId}`);

// 검색용 API
export const fetchSearchMulti = async (query) => {
  const res = await fetch(
    `${URL}/search/multi?api_key=${myAPI}&language=ko-KR&query=${encodeURIComponent(
      query
    )}`
  );
  return res.json();
};
