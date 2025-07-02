import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { instance, movieStore } from '../movieState';
import CardList from '../component/CardList';

function Movie() {
    const { data, genre, type, allData, genresData} = movieStore();
    const [ list, setList ] = useState([]);        // 출력할 영화/TV 리스트
    const [ gList, setGList ] = useState([]);      // 장르 리스트
    const [ gType, setGType ] = useState([]);      // 리스트 타입 정보 (예: movie/popular)
    const [ pageNum, setPageNum ] = useState(1);   // 페이지 번호
    const [ search, setSearch ] = useState('all'); // 검색 결과 상태

    useEffect(()=>{
        allData('get');    // 전체 영화/TV 데이터 가져오기
        genresData('get'); // 장르 데이터 가져오기
    },[])

    const location = useLocation();
    const path = location.pathname.split("/").filter(Boolean);

    //data
    useEffect(() => {
        const getFilteredData = () => {
            if (path.length === 1) { // /movie 또는 /tv 일 때
                return {
                    popular: data[path[0]]?.popular || [],
                    top_rated: data[path[0]]?.top_rated || [],
                };
            } else if (path.length === 2) { // /movie/popular, /movie/top_rated, /tv/popular, /tv/top_rated 일 때
                return data[path[0]]?.[path[1]] || [];
            }
            return [];
        };
        setList(getFilteredData());
    }, [location.pathname, data]);
    
    
    //genre
    useEffect(() => {
        const getGenres = () => {
            if (path[0] === "movie") {
                return genre.mGenres;
            } else if (path[0] === "tv") {
                return genre.tGenres;
            }
            return []; // 다른 경우는 빈 배열
        };
        setGList(getGenres());
    }, [location.pathname, genre]);
    
    //type
    useEffect(() => {
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

    //pathname이 변경되면 스크롤 맨 위로 및 list 초기화
    useEffect(() => {
        window.scrollTo(0, 0);
        setList([]);
    }, [location.pathname]);

    //page
    useEffect(()=>{
        const pageData = async () => {
        if (path.length === 1) {
            // /movie 또는 /tv 일 때, popular와 top_rated 둘 다 요청
            const [popularRes, topRatedRes] = await Promise.all([
                instance.get(`/${path[0]}/popular?page=${pageNum}`),
                instance.get(`/${path[0]}/top_rated?page=${pageNum}`)
            ]);

            const popular = popularRes.data.results.filter(item => item.poster_path && item.backdrop_path)
            .map(item => ({ ...item, type: 'popular' }));
            const top_rated = topRatedRes.data.results.filter(item => item.poster_path && item.backdrop_path)
            .map(item => ({ ...item, type: 'top_rated' }));

            setList(prev => pageNum === 1 ? [...popular, ...top_rated] : [...prev, ...popular, ...top_rated]);
            
        } else if (path.length === 2) {
            // /movie/popular, /movie/top_rated, /tv/popular, /tv/top_rated 일 때
            const res = await instance.get(`/${path[0]}/${path[1]}?page=${pageNum}`);
            const newData = res.data.results;

            setList(prev => pageNum === 1 ? newData : [...prev, ...newData]);
        }
    };

    pageData();
    },[location.pathname, pageNum])

    function value (e){
        e.preventDefault(); 
        let a = e.target.search.value;

        instance.get(`/search/${path[0]}?query=${a}`)
        .then((res)=>{
            setSearch(res.data.results);
        })
    }
    if(!list.length || list.length == 2){return}

    return (  
    <>
    <div className='listDetail'>
        <h2>{path[0] =='movie'? 'Movie':'TV Shows'}</h2>
        <form onSubmit={value}>
            <div>
                <input type="text" name="search" placeholder='검색'/>
                <button></button>
            </div>
        </form>
    </div>
    {path.length === 1 ? (
        // "/movie", "/tv"일 때
        search === "all" ?
        <div className="toptop">
            {list.length > 0 &&(
                list.map((item) => (
                <CardList item={item} genre={gList} type={[...path, item.type]}/>
            ))
            )}
        </div>
        :
        <div className="toptop">
            {search.map((item)=>
                <CardList key={item.id} item={item} genre={gList} type={type[0]}/>
            )}
        </div>
        ) : (
        // /popular, /top_rated 일 때
        search === "all" ?
        <div className="toptop">
            {list.map((item) => (
                <CardList key={item.id} item={item} genre={gList} type={gType[0]}/>
            ))}
        </div>
        :
        <div className="toptop">
            {search.map((item)=>
                <CardList key={item.id} item={item} genre={gList} type={type[0]}/>
            )}
        </div>
        )}
        <button className='more' onClick={()=>{setPageNum(count => count+1)}}>더 보기</button>
    </>
    ) 
}

export default Movie