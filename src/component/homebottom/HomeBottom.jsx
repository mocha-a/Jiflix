import { useEffect } from 'react'
import { movieStore } from '../../movieState';
import SlideList from './SlideList'

function HomeBottom() {
    const { data, genre, type, allData, genresData } = movieStore();

    useEffect(()=>{
        allData('get');
        genresData('get')
    },[])
  return (
    <>
      <SlideList title="전 세계인이 엄선한 최고의 영화" data={data.movie.popular} genre={genre.mGenres} type={type[0]}/>
      <SlideList title="어머 ! 이건 꼭 봐야해" data={data.movie.top_rated} genre={genre.mGenres} type={type[1]}/>
      <SlideList title="추천 급상승 드라마" data={data.tv.popular} genre={genre.tGenres} type={type[2]}/>
      <SlideList title="봐도 봐도 재밌는 인기 시리즈" data={data.tv.top_rated} genre={genre.tGenres} type={type[3]}/>
    </>
  )
}

export default HomeBottom