import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import CardList from '../CardList';

import 'swiper/css';
import 'swiper/css/scrollbar';


function SlideList({title, data, genre, type}) {

  return (
    <div className='con'>
        <NavLink to={`/${type[0]}/${type[1]}`}>
        <div className='title'>
            <h3>{title}</h3>
            <div className='viewmoreicon'>
                <p>모두 보기</p>
            </div>
        </div>
        </NavLink>
        <Swiper
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        scrollbar={{
        hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
        breakpoints={{
            0: {
            slidesPerView: 3,
            },
            768: {
            slidesPerView: 4,
            },
            1280: {
            slidesPerView: 5,
            },
        }}
        >
        {
        data.map((item)=>
            <SwiperSlide key={item.id}>
                <CardList item={item} genre={genre} type={type}/>
            </SwiperSlide>
        )
        }
        </Swiper>
    </div>
  )
} 

export default SlideList