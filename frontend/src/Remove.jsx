import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { removeData } from "./actions/List.actions";

function Remove() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        removeData(id);
        navigate('/');
    }, []);

    return (<div>hello world</div>)
}

export default Remove
