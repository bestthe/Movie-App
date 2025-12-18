import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import CardList from '../components/CardList';
import SkeletonCard from '../components/SkeletonCard';
import { fetchSearchMulti } from '../api/tmdb';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletonCount = 8;

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setLoading(true);

      try {
        const res = await fetchSearchMulti(query);
        setTimeout(() => {
          setResults(
            res.results.filter((item) => item.media_type !== 'person')
          );
          setLoading(false);
        }, 1500);
      } catch (e) {
        setTimeout(() => {
          setResults([]);
          setLoading(false);
        }, 1500);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <Section title={`"${query}" 검색 결과`}>
      {loading
        ? Array.from({ length: skeletonCount }).map((_, idx) => (
            <SkeletonCard key={`skeleton-${idx}`} />
          ))
        : results.length === 0
        ? '검색 결과가 없습니다.'
        : results.map((item) => (
            <CardList key={`${item.media_type}-${item.id}`} item={item} />
          ))}
    </Section>
  );
}

export default Search;
