import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    // stars: []
}

const UpdateForm = (props) => {
    const [movie, setMovie] = useState(initialValues);

    const handleChanges = (e) => {
        e.persist();
        //let value = e.target.value;
        const { name, value } = e.target;
        setMovie({
            ...movie,
            [name]: value,
        });  
    };

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/:${id}`)
            .then((res) => {
                console.log("Update form get results: ", res);
                setMovie(res.data);
            })
            .catch((err) => {
                console.log("ERROR Update form get request: ", err)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/:${id}`, movie)
            .then((res) => {
                props.setMovieList(res.data)
                push(`/movies/:${id}`)
            })
            .catch((err) => {
                console.log("ERROR Update form put request: ", err)
            })
    };

    return (
        <div>
            <h2>Update Movie:</h2>
            <form onSubmit = {handleSubmit}>
                <input 
                    type = 'text'
                    name = 'title'
                    value = {movie.title}
                    onChange = {handleChanges}
                    placeholder = 'Title'
                />
                <input 
                    type = 'text'
                    name = 'director'
                    value = {movie.director}
                    onChange = {handleChanges}
                    placeholder = 'Director'
                />
                <input 
                    type = 'number'
                    name = 'metascore'
                    value = {movie.metascore}
                    onChange = {handleChanges}
                    placeholder = 'Metascore'
                />
                {/* <input 
                    type = 'text'
                    name = 'stars'
                    value = {movie.stars}
                    onChange = {handleChanges}
                    placeholder = 'Stars'
                /> */}

            </form>
        </div>
    )

}

export default UpdateForm;