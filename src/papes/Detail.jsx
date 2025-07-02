import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination, Scrollbar } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { movieStore } from '../movieState';
import CardList from '../component/CardList';


function Detail({genres}) {
    const { genre, genresData } = movieStore();
    const { state } = useLocation();
    const [ movie, setMovie ] = useState(null);
    const [ similar, setSimilar ] = useState(null);
    const [ gType, setGType ] = useState([]);
    const [ gList, setGList ] = useState([]);

    const location = useLocation();
    const path = location.pathname.split("/").filter(Boolean);
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[location.pathname])
    
    //type
    useEffect(() => {
        genresData('get')

        if (path[0] === 'movie') {
            // /movie, /movie/popular, /movie/top_rated 일 때
            if (path.length === 1) {
                setGType([['movie', 'popular'], ['movie', 'top_rated']]);
            } else if (path[1] === 'popular') {
                setGType([['movie', 'popular']]);
            } else if (path[1] === 'top_rated') {
                setGType([['movie', 'top_rated']]);
            }
            } else if (path[0] === 'tv') {
            // /tv, /tv/popular, /tv/top_rated 일 때
            if (path.length === 1) {
                setGType([['tv', 'popular'], ['tv', 'top_rated']]);
            } else if (path[1] === 'popular') {
                setGType([['tv', 'popular']]);
            } else if (path[1] === 'top_rated') {
                setGType([['tv', 'top_rated']]);
            }
        }
    }, [location.pathname, setGType]);

    //genre
    useEffect(() => {
        const getGenres = () => {
            if (path[0] === "movie") {
                return genre.mGenres;
            } else if (path[0] === "tv") {
                return genre.tGenres;
            }
        };
        setGList(getGenres());
    }, [location.pathname, genre]);

    //detail
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/${state.genre}/${state.id}?api_key=f89a6c1f22aca3858a4ae7aef10de967&append_to_response=release_dates,videos,images,casts&language=ko-kr`)
        .then(res => {
            const data = res.data

            if(path[0] === "movie"){
                if(data.casts.cast){
                    data.casts.cast = data.casts.cast.filter(cast => cast.profile_path);
                }
            }else{
                if(data.created_by){
                    data.created_by = data.created_by.filter(cast => cast.profile_path);
                }
            }
            setMovie(data);
        })
    },[state])

    //similar
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/${state.genre}/${state.id}/similar?api_key=f89a6c1f22aca3858a4ae7aef10de967&language=ko-kr`)
        .then(res => {
            const filteredSimilarMovies = res.data.results.filter(movie => movie.backdrop_path && movie.poster_path);
            setSimilar(filteredSimilarMovies);
    })
    },[state])
    
    if (!movie || !similar) return <p>로딩 중...</p>

return (
    <>
        <div className='detail_container con1' key={movie.id}>
            <div className='concon1'>
                <div className='con1_img'>
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                </div>
                <div className='detail_position'>
                    <div className='detail_flex'>
                        <div className='detail_poster'><img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" /></div>
                        <div className='detail_text'>
                            <h2>{movie.title? movie.title : movie.name}</h2>
                            <p className='tag'>{movie.release_date? movie.release_date : movie.last_air_date}</p>
                            <p className='tag'>{movie.runtime? `${movie.runtime}분`: `시즌 ${movie.seasons.length}개`}</p>
                            <p className='tag star'>{movie.vote_average}</p>
                            <div className='genres'>
                                <p>{
                                    movie.genres.map((g)=>{
                                        return <span className="tag" key={g.id}>{g.name}</span>
                                    })
                                }
                                </p>
                            </div>
                            <p className='detail_view'>{movie.overview}</p>
                            <div className='cast'>
                            <Swiper
                                loop={true}
                                slidesPerView={5}
                                spaceBetween={13}
                                freeMode={true}
                                autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                                }}
                                speed={800}
                                modules={[FreeMode, Pagination, Autoplay]}
                                breakpoints={{
                                    0: {
                                    slidesPerView: 5,
                                    },
                                    768: {
                                    slidesPerView: 4,
                                    },
                                    1280: {
                                    slidesPerView: 5,
                                    },
                                }}
                                className="mySwiper"
                            >
                                {
                                movie.casts?
                                movie.casts.cast.map((item)=>{
                                    return <SwiperSlide key={item.credit_id}>
                                    <img src={`https://image.tmdb.org/t/p/original${item.profile_path}`} className="castImg"/>
                                    <span className="castName" >{item.original_name}</span>
                                    </SwiperSlide>
                                })
                                :
                                movie.seasons.map((item)=>{
                                    return <SwiperSlide key={item.id}>
                                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className='castImg' alt="" />
                                    <p>{item.air_date?.split('-')[0]}</p>
                                    <p>{item.name}</p>
                                    </SwiperSlide>
                                })
                            }
                            </Swiper></div>
                        </div>
                    </div>
                </div>
            </div>
            {movie.videos.results.map((item)=>
                <article key={item.id}>
                    <iframe src={ `https://www.youtube.com/embed/${item.key}?si=UlfbtacNDSOR31Kd title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>
            )}
            <div className='similar'>
                <h3>비슷한 컨텐츠</h3>
                <Swiper
                spaceBetween={2}
                slidesPerView={5}
                loop={true}
                scrollbar={{
                hide: true,
                }}
                modules={[Scrollbar]}
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
                className="mySwiper"
                >
                    {
                        similar.map((item)=>
                            <SwiperSlide key={item.id}>
                                <CardList item={item} genre={gList} type={gType[0]}/>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </div>
    </>
)
}

export default Detail