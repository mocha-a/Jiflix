import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { instance } from '../movieState';

function CardList({item, genre, type}) {
    const [trailerKey, setTrailerKey] = useState(null);
    const observerRef = useRef();
    const location = useLocation();    
    const navigate = useNavigate();
    const imageSize = location.pathname === "/" ? "image-large" : "image-small";

    useEffect(() => {
        // IntersectionObserver 생성
        const observer = new IntersectionObserver(
            async ([entry], obs) => {
                // 요소가 화면에 보이고(trailerKey가 아직 없을 때)
                if (entry.isIntersecting && trailerKey === null) {
                    try {
                        // 예고편 데이터 요청
                        const res = await instance.get(`/${type[0]}/${item.id}`);
                        // YouTube 예고편만 필터링
                        const trailer = res.data.videos?.results.find(
                            (v) => v.type === 'Trailer' && v.site === 'YouTube'
                        );
                        // 예고편 키 저장
                        if (trailer) {
                            setTrailerKey(trailer.key);
                        }
                    } catch (err) {
                        console.error("예고편 로딩 실패", err); // 에러 출력
                    }
                    obs.disconnect(); // 한 번만 실행되도록 옵저버 해제
                }
            },
            { threshold: 0.3 } // 요소가 30% 이상 보일 때 감지
        );

        // 감시할 대상이 존재하면 옵저버 등록
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        // 컴포넌트 언마운트 시 옵저버 해제
        return () => observer.disconnect();
    }, []);
    
    return (
    <div className={`poster_path movieList ${imageSize}`} key={item.id} ref={observerRef} >
        <div className='poster_path_img'><img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" /></div>
        <div onClick={() =>
            navigate(`/${type[0]}/${type[1]}/${item.id}`, {
            state: { id: item.id, genre: type[0] },
            })
        }>
            <div className='slide_hover'>
                <div className='slide_hover_img'>
                    <div><img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" /></div>
                </div>
                <div className='slide_hover_flex'>
                    <h3>{item.title? item.title : item.name}</h3>
                    {trailerKey && (
                    <button
                        className='flex_button play'
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
                        }}
                        ></button>
                    )}
                    <button className='flex_button good'></button>
                    <button className='flex_button detail'></button>
                    
                    <div className='slide_hover_flex01'>
                        <div>
                            <p>{item.release_date?(item.release_date)?.split('-')[0]:(item.last_air_date)?.split('-')[0] }</p>
                            <p>{item.vote_average}</p>
                        </div>
                        <p>{
                            item.genre_ids.map((g)=>{
                                return genre.find((g2)=>g2.id==g)?.name
                            })
                            .join(' ▪ ')
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CardList