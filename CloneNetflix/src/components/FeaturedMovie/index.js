import React from "react";
import './style.css';

export default ({item}) => {

    let date = new Date(item.first_air_date);
    let voteColor = item.vote_average > 8 ? '#46d369' : '#ffff00';
    
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }
    

    return (
        <section className="featured" style={{
            backgroundSize : 'cover',
            backgroundPosition : 'center',
            backgroundImage : `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--verticalGradient">
                <div className="featured--horizontalGradient">
                    <div className="featured--name">{item.name}</div>
                    <div className="featured--info">
                        <div className="featured--points" style={{color : `${voteColor}`}}>{item.vote_average.toFixed(1)} pontos</div>
                        <div className="featured--year">{date.getFullYear()}</div>
                        <div className="featured--seasons">{`${item.number_of_seasons} temporada${item.number_of_seasons > 1 ? 's' : ''}`}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href={item.homepage} target={"_blank"} className="featured--watchBtn">Assistir</a>
                        <a href={`list/add/${item.id}`} className="featured--listBtn">+ Minha lista</a>
                    </div>
                    <div className="featured--genres"><strong>{`Gênero${item.genres.length > 1 ? 's' : ''}: `}</strong>{genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}