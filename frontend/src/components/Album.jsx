

import React, { useState } from 'react';


const Album = (album) => {

    const [val, setVal] = useState('');
    const [attr, setAttr] = useState('');

    const handleSupp = async (e) => {

        e.preventDefault();
        const response = await fetch(`/album/delete/${album.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev: album.value.rev}),
        })
        const data = await response.json();

        if(!response.ok){
            console.log(data.error );

        }else{
            console.log(data);
        }
    }


    const handleModif = async (e) => {

        

        e.preventDefault();
        const response = await fetch(`/album/update/${album.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev: album.value.rev, attr: attr, value: val}),
        });
        const data = await response.json();
        if(!response.ok){
            console.log(data.error);
        }else{
            setVal('');
            setAttr('');
        }
    }




    return (
        <div className="workout-details">
        <h4>{album.value.name}</h4>
        <p><strong>Artist: </strong>{album.value.artist}</p>
        <p><strong>Genre: </strong>{album.value.genre}</p>
        <p><strong>Number of Tracks: </strong>{album.value.numberTracks}</p>
        <p><strong>Release Date: </strong>{album.value.releaseDate}</p>
        <p><strong>Price: </strong>{album.value.price}</p>
        <p>{album.createdAt}</p>
        <form className="create mt-5" onSubmit={handleSupp}>
            {/* <input type="hidden" value="<%= instru.value.rev %>" name="rev"/> */}
           <button className="text-center bg-red-500 text-white py-2 px-4 rounded text-[10px]">supprimer</button>
        </form>
        <form className="create mt-5" onSubmit={handleModif}>
            <select name="att" value={attr} onChange={(e) => setAttr(e.target.attr)}>
                <option value="Select an attribute..." disabled selected>Select an attribute...</option>
                <option value="name" name="name">name</option>
                <option value="artist"  name="artist">artist</option>
                <option value="genre" name="genre">genre</option>
                <option value="numberTracks" name="numberTracks">numberTracks</option>
                <option value="releaseDate" name="releaseDate">releaseDate</option>
                <option value="price" name="price">price</option>
            </select>
            
            <input type="text"  name="newVal" value={val} onChange={(e) => setVal(e.target.value)}/>
            
            <button className="text-center text-white py-2 px-4 rounded text-[10px]"> modifier </button>
        </form>
      </div>
    );
}


export default Album;