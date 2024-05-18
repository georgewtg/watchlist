import React, {useState} from "react";
import './Modal.css'
import { addData } from "./actions/List.actions";

function Modal({ isOpen }) {
    const [formData, setFormData] = useState({
        title: '',
        status: '',
        current: 0,
        total: 0,
    });

    const change = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const submitData = () => {
        console.log("formData:");
        console.log(formData);

        addData(formData);
        window.location.reload();
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Add something to the watchlist</h1>
                </div>
                <div className="body">
                    <h1>Insert Watchlist Title: <input name="title" onChange={change} value={formData.title}/></h1>
                    <h1>
                        Status: 
                        <label name="status">
                            <input type="radio" className="status" name="status" onClick={change} value="Planning" checked={formData.status === "Planning"}/>
                            Planning
                        </label>
                        <label name="status">
                            <input type="radio" className="status" name="status"  onClick={change} value="Watching" checked={formData.status === "Watching"}/>
                            Watching
                        </label>
                        <label name="status">
                            <input type="radio" className="status" name="status"  onClick={change} value="Completed" checked={formData.status === "Completed"}/>
                            Completed
                        </label>
                    </h1>
                    <h1>
                        Watched: 
                        <input name="current" type="number" onChange={change} value={formData.current}/>
                         / 
                        <input name="total" type="number" onChange={change} value={formData.total}/>
                    </h1>
                </div>
                <div className="footer">
                    <button onClick={() => isOpen(false)}>cancel</button>
                    <button onClick={submitData}>add to watchlist</button>
                </div>
            </div>
        </div>
    )
}

export default Modal