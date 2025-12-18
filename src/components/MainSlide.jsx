import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import {
  fetchPopularMovies,
  fetchPopularTV,
  fetchMovieDetail,
  fetchTVDetail,
} from '../api/tmdb';

function MainSlide({ category }) {
  const [topContents, setTopContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mainSlideContent = async () => {
      setLoading(true);
      let contents = [];

      if (category === 'home') {
        const moviePopular = await fetchPopularMovies();
        const tvPopular = await fetchPopularTV();

        contents = [
          ...moviePopular.results.map((item) => ({
            ...item,
            media_type: 'movie',
          })),
          ...tvPopular.results.map((item) => ({
            ...item,
            media_type: 'tv',
          })),
        ];
      } else if (category === 'movie') {
        const moviePopular = await fetchPopularMovies();
        contents = moviePopular.results.map((item) => ({
          ...item,
          media_type: 'movie',
        }));
      } else if (category === 'tv') {
        const tvPopular = await fetchPopularTV();
        contents = tvPopular.results.map((item) => ({
          ...item,
          media_type: 'tv',
        }));
      }

      const sortedByPopularity = contents
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 8);

      const contentsWithTagline = await Promise.all(
        sortedByPopularity.map(async (item) => {
          try {
            const detail =
              item.media_type === 'movie'
                ? await fetchMovieDetail(item.id)
                : await fetchTVDetail(item.id);

            return { ...item, tagline: detail?.tagline || '' };
          } catch {
            return item;
          }
        })
      );

      setTopContents(contentsWithTagline);
      setLoading(false);
    };

    mainSlideContent();
  }, [category]);

  if (loading) return null;

  return (
    <section className="mainSlide">
      <Swiper
        slidesPerView={1}
        centeredSlides
        speed={600}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation
        breakpoints={{
          1201: {
            spaceBetween: 30,
            slidesPerView: 1.5,
          },
          769: {
            spaceBetween: 20,
            slidesPerView: 1.3,
          },
          601: {
            spaceBetween: 20,
            slidesPerView: 1.15,
          },
          501: {
            spaceBetween: 10,
            slidesPerView: 1.1,
          },
        }}
      >
        {topContents.map((item) => (
          <SwiperSlide key={`${item.media_type}-${item.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
              alt={item.title || item.name}
            />
            <div className="slide-desc">
              <h2>{item.title || item.name}</h2>
              {item.tagline && <p>{item.tagline}</p>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default MainSlide;
