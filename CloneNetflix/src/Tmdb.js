const API_KEY = '783821dcb9733255f083c8c741c477ca';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFectch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList : async () => {
        return [
            {
                slug : 'originals',
                title : 'Originais Netflix',
                items : await basicFectch(`/discover/tv?with_networks=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'trending',
                title : 'Recomendados',
                items : await basicFectch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'toprated',
                title : 'Em alta',
                items : await basicFectch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'action',
                title : 'Ação',
                items : await basicFectch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'comedy',
                title : 'Comédia',
                items : await basicFectch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'horror',
                title : 'Terror',
                items : await basicFectch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'romance',
                title : 'Romance',
                items : await basicFectch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug : 'documentary',
                title : 'Documentários',
                items : await basicFectch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ]
    },

    getMovieInfo : async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFectch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFectch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
            }
        }

        return info;
    }
}