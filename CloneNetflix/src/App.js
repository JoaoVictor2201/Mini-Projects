import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomPicked = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let picked = originals[0].items.results[randomPicked];
      let pickedInfo = await Tmdb.getMovieInfo(picked.id, 'tv');

      setFeaturedData(pickedInfo);

    }

    loadAll();
  }, []);

  return (
    <div className="page">

      <Header key={'header'} />

      {featuredData &&
        <FeaturedMovie key={`featured`} item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={`row_${item.slug}`} title={item.title} items={item.items} />
        ))}
      </section>

    </div>
  )
}