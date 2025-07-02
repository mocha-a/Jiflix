import { create } from 'zustand';
import axios from 'axios';

export const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    
    params: {
        append_to_response: "release_dates,videos,images,casts",
        api_key: "f89a6c1f22aca3858a4ae7aef10de967",
        language: "ko-KR"
    }
});


export const movieStore = create((set) => ({
    data: {
        movie: {
            popular: [],
            top_rated: [],
        },
        tv: {
            popular: [],
            top_rated: [],
        }
    },
    genre:{
        mGenres:[],
        tGenres:[],
    },
    type:[['movie','popular'],['movie','top_rated'],['tv','popular'],['tv','top_rated']],

    allData:async ()=>{
        await Promise.all([
            instance.get('/movie/popular'),
            instance.get('/movie/top_rated'),
            instance.get('/tv/popular'),
            instance.get('/tv/top_rated')
        ])
        .then(res=>{
            const a = res[0].data.results.filter(item => item.poster_path && item.backdrop_path);
            const b = res[1].data.results.filter(item => item.poster_path && item.backdrop_path);
            const c = res[2].data.results.filter(item => item.poster_path && item.backdrop_path);
            const d = res[3].data.results.filter(item => item.poster_path && item.backdrop_path);
            set({data:{movie:{popular:a, top_rated:b}, tv:{popular:c, top_rated:d}}});
        })
    },

    genresData:async()=>{
        await Promise.all([
            instance.get('/genre/movie/list'),
            instance.get('/genre/tv/list')
        ])
        .then(res=>{
            const a = res[0].data.genres;
            const b = res[1].data.genres;
            set({genre:{mGenres:a, tGenres:b}});
        })
    }
}));