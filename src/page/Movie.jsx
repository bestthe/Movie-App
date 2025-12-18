import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import CardList from '../components/CardList';
import LoadMoreButton from '../components/LoadMoreButton';
import SkeletonCard from '../components/SkeletonCard';
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../api/tmdb';

function Movie() {
  const movieCount = 8;

  const [visible, setVisible] = useState({
    nowPlay: movieCount,
    popular: movieCount,
    topRated: movieCount,
    upcoming: movieCount,
  });

  const [loadingMore, setLoadingMore] = useState({});

  const [nowPlay, setNowPlay] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const movieSections = [
    {
      key: 'nowPlay',
      title: '극장에서 만나는 영화',
      className: 'nowPlay',
      data: nowPlay,
    },
    {
      key: 'popular',
      title: '많은 사람들이 보는 영화',
      className: 'popular-movie',
      data: popular,
    },
    {
      key: 'topRated',
      title: '명작으로 평가받는 영화',
      className: 'topRated-movie',
      data: topRated,
    },
    {
      key: 'upcoming',
      title: '곧 만날 수 있는 영화',
      className: 'upcoming',
      data: upcoming,
    },
  ];

  useEffect(() => {
    const fetchMovie = async () => {
      const [nowPlayRes, popularRes, topRatedRes, upcomingRes] =
        await Promise.all([
          fetchNowPlayingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
        ]);

      setNowPlay(nowPlayRes.results);
      setPopular(popularRes.results);
      setTopRated(topRatedRes.results);
      setUpcoming(upcomingRes.results);
    };

    fetchMovie();
  }, []);

  return (
    <>
      {movieSections.map(({ key, title, className, data }) => (
        <Section
          key={key}
          title={title}
          className={className}
          footer={
            <LoadMoreButton
              onClick={() => {
                if (loadingMore[key]) return;

                setLoadingMore((prev) => ({ ...prev, [key]: true }));

                setTimeout(() => {
                  setVisible((prev) => ({
                    ...prev,
                    [key]: prev[key] + movieCount,
                  }));

                  setLoadingMore((prev) => ({ ...prev, [key]: false }));
                }, 1500);
              }}
              isVisible={visible[key] < data.length}
            />
          }
        >
          {data.slice(0, visible[key]).map((item) => (
            <CardList key={item.id} item={item} />
          ))}

          {loadingMore[key] &&
            Array.from({ length: movieCount }).map((_, idx) => (
              <SkeletonCard key={`skeleton-${key}-${idx}`} />
            ))}
        </Section>
      ))}
    </>
  );
}

export default Movie;
