import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { movieStore, instance } from '../movieState';

import 'swiper/css';
import 'swiper/css/scrollbar';

function HomeTop() {
  const { type } = movieStore();
  const [ trailer, setTrailer ] = useState([]);

  useEffect(() => {
    const trailerList = async () => {
      try {
        const res = await instance.get('/movie/popular');
        const movies = res.data.results.filter(item => item.poster_path && item.backdrop_path);

        const withTrailer = await Promise.all(
          movies.map(async (item) => {
            const detail = await instance.get(`/movie/${item.id}`);
            const trailer = detail.data.videos?.results.find(
              (v) => v.type === 'Trailer' && v.site === 'YouTube'
            );
            if (trailer) {
              return { ...item, trailerKey: trailer.key };
            }
            return null;
          })
        );

        setTrailer(withTrailer.filter(Boolean));
      } catch (err) {
        console.error('예고편 슬라이드 로딩 실패 😢', err);
      }
    };

    trailerList();
  }, []);
    
  return (
    <div className='con1'>
      <Swiper className="mySwiper">
        {trailer?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='con1_img'>
              <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" />
            </div>
            <div className='con1Flex'>
              <div className='con1_text'>
                <h2>{item.title}</h2>
                <p className='overview'>{item.overview}</p>
                <div className='button_flex'>
                    <button className="youtube" onClick={() => window.open(`https://www.youtube.com/watch?v=${item.trailerKey}`, '_blank')}>
                      예고편
                    </button>
                    <NavLink
                      className="gogo"
                      to={`${type[0][0]}/${type[0][1]}/${item.id}`}
                      state={{ id: item.id, genre: type[0][0] }}
                    >
                      상세 정보
                    </NavLink>
                </div>
              </div>
              <div className='poster'>
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeTop