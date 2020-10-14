import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = () => {
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



}

export default UpdateForm;