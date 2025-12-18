import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import CardList from '../components/CardList';
import LoadMoreButton from '../components/LoadMoreButton';
import SkeletonCard from '../components/SkeletonCard';
import {
  fetchAiringTodayTV,
  fetchOnTheAirTV,
  fetchPopularTV,
  fetchTopRatedTV,
} from '../api/tmdb';

function Tv() {
  const tvCount = 8;

  const [visible, setVisible] = useState({
    airing: tvCount,
    onAir: tvCount,
    popular: tvCount,
    topRated: tvCount,
  });

  const [loadingMore, setLoadingMore] = useState({});

  const [airing, setAiring] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const tvSections = [
    {
      key: 'airing',
      title: '오늘 방송되는 TV 시리즈',
      className: 'airing-today',
      data: airing,
    },
    {
      key: 'onAir',
      title: '지금 방송 중인 TV 프로그램',
      className: 'onAir',
      data: onAir,
    },
    {
      key: 'popular',
      title: '많은 사람들이 보는 TV 프로그램',
      className: 'popular-tv',
      data: popular,
    },
    {
      key: 'topRated',
      title: '높은 평가를 받은 TV 프로그램',
      className: 'topRated-tv',
      data: topRated,
    },
  ];

  useEffect(() => {
    const fetchTv = async () => {
      const [airingRes, onAirRes, popularRes, topRatedRes] = await Promise.all([
        fetchAiringTodayTV(),
        fetchOnTheAirTV(),
        fetchPopularTV(),
        fetchTopRatedTV(),
      ]);

      setAiring(airingRes.results);
      setOnAir(onAirRes.results);
      setPopular(popularRes.results);
      setTopRated(topRatedRes.results);
    };

    fetchTv();
  }, []);

  return (
    <>
      {tvSections.map(({ key, title, className, data }) => (
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
                    [key]: prev[key] + tvCount,
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
            Array.from({ length: tvCount }).map((_, idx) => (
              <SkeletonCard key={`skeleton-${key}-${idx}`} />
            ))}
        </Section>
      ))}
    </>
  );
}

export default Tv;
