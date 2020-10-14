import React, { useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";

import AddMovieForm from './AddMovieForm';
import UpdateForm from './UpdateForm';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <nav>
        <h1 className="store-header">List of Movies</h1>
        <div className="nav-links">
          <NavLink exact to="/add-movie">
            Add Movie
          </NavLink>
          {/* <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/item-list">Shop</NavLink> */}
        </div>
      </nav>

      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList = {setMovieList} movieList = {movieList} />
      </Route>

      <Route path = '/update-movie/:id' 
        render = {(props) => {
          return <UpdateForm {...props} setMovieList = {setMovieList} />
        }}
      />

      <Route path="/add-movie">
        <AddMovieForm setMovieList = {setMovieList} movieList = {movieList} />
      </Route>

    </>
  );
};

export default App;
