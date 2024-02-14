import React from 'react';
import AlbumForm from '../components/AlbumForm';
import Album from '../components/Album';
import { useEffect, useState } from 'react';


const Albums = () => {


    const [error, setError] = useState('');
    const [albums, setAlbums] = useState('');

    useEffect(() => {

        const fetchAlbums = async () => {
            const response = await fetch('/albums');
            const data = await response.json();

            if(!response.ok){
                console.log(data.error);
            }else {
                setAlbums(data);
                console.log(data);
            }
        }

        fetchAlbums();
    })

    return (
        <div className="home">
            <div className="workouts">
                {albums && albums.map((album) => (
                    <Album key='instrument.key' album={album}/>
                ))}
            </div>
            <AlbumForm/>
        </div>
    );
};

export default Albums;
