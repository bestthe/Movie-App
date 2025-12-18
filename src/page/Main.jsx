import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import CardList from '../components/CardList';
import LoadMoreButton from '../components/LoadMoreButton';
import SkeletonCard from '../components/SkeletonCard';
import {
  fetchTrendingContents,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchPopularTV,
  fetchTopRatedTV,
} from '../api/tmdb';

function Main() {
  const cardCount = 8;
  const [visible, setVisible] = useState({
    trending: cardCount,
    popularMovie: cardCount,
    topRatedMovie: cardCount,
    popularTV: cardCount,
    topRatedTV: cardCount,
  });

  const [loadingMore, setLoadingMore] = useState({});

  const [trending, setTrending] = useState([]);
  const [popularMoives, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  const sections = [
    {
      key: 'trending',
      title: '오늘의 트렌딩 콘텐츠',
      className: 'trending',
      data: trending,
    },
    {
      key: 'popularMovie',
      title: '지금 인기 있는 영화',
      className: 'popular-movie',
      data: popularMoives,
    },
    {
      key: 'topRatedMovie',
      title: '관객들이 인정한 명작 영화',
      className: 'topRated-movie',
      data: topRatedMovies,
    },
    {
      key: 'popularTV',
      title: '지금 인기 있는 TV 시리즈',
      className: 'popular-tv',
      data: popularTV,
    },
    {
      key: 'topRatedTV',
      title: '평가가 좋은 TV 프로그램',
      className: 'topRated-tv',
      data: topRatedTV,
    },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const [
        trendingRes,
        popularMovieRes,
        topRatedMovieRes,
        popularTvRes,
        topRatedTvRes,
      ] = await Promise.all([
        fetchTrendingContents(),
        fetchPopularMovies(),
        fetchTopRatedMovies(),
        fetchPopularTV(),
        fetchTopRatedTV(),
      ]);

      setTrending(
        trendingRes.results.filter((item) => item.media_type !== 'person')
      );

      setPopularMovies(popularMovieRes.results);
      setTopRatedMovies(topRatedMovieRes.results);
      setPopularTV(popularTvRes.results);
      setTopRatedTV(topRatedTvRes.results);
    };
    fetchAll();
  }, []);

  return (
    <>
      {sections.map(({ key, title, className, data }) => (
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
                    [key]: prev[key] + cardCount,
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
            Array.from({ length: cardCount }).map((_, idx) => (
              <SkeletonCard key={`skeleton-${key}-${idx}`} />
            ))}
        </Section>
      ))}
    </>
  );
}

export default Main;
