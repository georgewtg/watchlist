import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchList } from "./actions/List.actions";
import Modal from './Modal';
import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchWatchlist = async () => {
    const apiResponse = await fetchList();
    if (apiResponse.success) {
      //See the result in the console from the browser
      console.log("Response In App.jsx");
      console.log(apiResponse.data);

      setWatchlist(apiResponse.data);
    } else {
      alert("Failed to fetch watchlist");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="bg-light_mint">
      <div className="flex">
        <navbar className="navButtons bg-mint" style={{ marginLeft: '30px' }}>Watch List</navbar>
      </div>
      <div className="grid grid-cols-1 p-4">
        <div>
          {watchlist.map(Card)}
          <div className="list rounded shadow">
            <div>{"Add to watchlist"}</div>
            <button 
              className="button text-xl font-semibold rounded shadow" 
              onClick={() => {
              setOpenModal(true);
              }}>
              ➕
            </button>
          </div>
        </div>
        {openModal && <Modal isOpen={setOpenModal}/>}
      </div>
    </div>
  )
}

function Card(item) {
  // return card for each array
  return (
    <Link to ={`/remove/${item.id}`}>
      <div className="list rounded shadow">
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.status}</div>
          <div>{`${item.current}/${item.total}`}</div>
        </div>
        <div className="button text-xl font-semibold rounded shadow">❌</div>
      </div>
    </Link>
  );
}

export default App
