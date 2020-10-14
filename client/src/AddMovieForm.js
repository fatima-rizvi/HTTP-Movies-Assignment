import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

//for stars, have them enter a string of stars separated by commas and split the string at the commas. Append the split strings to an array

const AddMovieForm = (props) => {
    const { setMovieList, movieList } = props;
    const [values, setValues] = useState(initialValues)

    const handleChanges = (e) => {
        e.persist();

        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });  
    };

    const postNewMovie = (newMovie) => {
        axios.post('http://localhost:5000/api/movies', newMovie)
            .then((res) => {
                console.log('add movie: ', res)
                setMovieList(res.data)
                console.log('new movie list: ', res)
            })
            .catch((err) => {
                console.log('Add movie error: ', err)
            })
    };

    const { push } = useHistory();

    const submitValues = (e) => {
        e.preventDefault()
        values.stars = values.stars.split(',')
        const newMovie = {
            id: Math.random(),
            title: values.title.trim(),
            director: values.director.trim(),
            metascore: values.metascore,
            stars: values.stars
        };
        postNewMovie(newMovie);
        setValues(initialValues);
        push('/')
    }


    return(
        <div>
            <h2>Add form:</h2>
            <form className = 'movie-form' onSubmit = {submitValues}>
                <label>Title: 
                    <input 
                        type = 'text'
                        name = 'title'
                        onChange = {handleChanges}
                        value = {values.title}
                        placeholder = 'enter title'
                    />
                </label>

                <label>Director: 
                    <input 
                        type = 'text'
                        name = 'director'
                        onChange = {handleChanges}
                        value = {values.director}
                        placeholder = 'enter director'
                    />
                </label>

                <label>Metascore: 
                    <input 
                        type = 'number'
                        name = 'metascore'
                        onChange = {handleChanges}
                        value = {values.metascore}
                        placeholder = 'enter metascore'
                    />
                </label>

                <label>Stars separated by commas: 
                    <input 
                        type = 'text'
                        name = 'stars'
                        onChange = {handleChanges}
                        value = {values.stars}
                        placeholder = 'enter stars'
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddMovieForm;