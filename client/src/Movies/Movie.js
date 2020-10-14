import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const { addToSavedList, setMovieList, movieList } = props
  const [movie, setMovie] = useState(null);
  const params = useParams();
  

  const fetchMovie = (id) => {
    //console.log('params: ', params)
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const { push } = useHistory();

  const updateMovie = (id) => {
    push(`/update-movie/${id}`)
  }

  const useUpdateMovie = () => {
    updateMovie(params.id)
  }

  const deleteMovie = (id) => {
    console.log("delete id: ", id)
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("delete res: ", res)
        const movies = movieList.filter( movie => 
          movie.id !== res.data
        )
        console.log('new movies', movies)
        setMovieList(movies)
        console.log('set movies: ', movieList)
        push('/')
      })
      .catch((err) => {
        console.log("Delete error: ", err)
      })
  }

  // .then( res => {
  //   movieList = movies.filter( movie => 
  //     movie.id !== res.data
  //   )
  //   setMovieList(movies)
  //   history.push('/')
  //   })

  const useDeleteMovie = () => {
    deleteMovie(params.id)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="update-button" onClick={useUpdateMovie}>
        Update
      </button>
      <button className="delete-button" onClick={useDeleteMovie}>
        Delete
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
