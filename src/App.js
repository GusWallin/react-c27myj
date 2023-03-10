import React, { useEffect, useState } from 'react';

/* import React from 'react'; */
import './style.css';
import Header from './header.js'; // importerar header
import Film from './film.js';

export default function App() {
  // Usestate variabler.
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [opening_crawl, setOpening_crawl] = useState('');
  const [release_date, setRelease_date] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => setFilms(data.results)); // Innehåller alla JSON data
  }, []);

  function showTitle() {
    setTitle(films[0].title);
    setDirector(films[0].director);
    setProducer(films[0].producer);
    setOpening_crawl(films[0].opening_crawl);
    setRelease_date(films[0].release_date);
  }

  const changeInputText = (e) => {
    setInputText(e.target.value);
  };

  function handleSearch(event) {
    if (event.key === 'Enter') {
      console.log('jag vill söka på: ', inputText);
      Match();
    }
  }

  function Match() {
    for (const film of films) {
      // console.log(film.title);
      if (film.title.toLowerCase().includes(inputText.toLowerCase())) {
        console.log('matchar nu med titel: ', film.title);
        setTitle(film.title);
        setDirector(film.director);
        setProducer(film.producer);
        setOpening_crawl(film.opening_crawl);
        setRelease_date(film.release_date);
      }
    }
  }

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="sök"
        className="searchBox"
        onChange={changeInputText}
        onKeyDown={handleSearch}
        value={inputText}
      ></input>
      {/*   <button disabled={films.length === 0} onClick={showTitle}>
        Visa film
      </button> */}
      <section className="container">
        <div className="title">Titel: {title}</div>
        <div className="director">Director: {director}</div>
        <div>Producer: {producer}</div>
        <div className="crawl">Opening crawl: {opening_crawl}</div>
        <div>Release date: {release_date}</div>
      </section>
      {/*   <Film filmtitel={title} /> {/* prop som har värdet title  */}
    </div>
  );
}
