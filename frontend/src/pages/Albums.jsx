import { useEffect, useState } from "react";

// component to display the home page
import Album from "../components/Album";
import AlbumForm from "../components/AlbumForm";

const Albums = () => {
    const [albums, setAlbums] = useState(null);

    useEffect(() => {

        
        const fetchAlbums = async () => {
            const response = await fetch('/albums');
            const data = await response.json();

            if (response.ok) {
                setAlbums(data);
                console.log(albums);
            }
        }

        fetchAlbums();
        console.log(albums);
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {albums && albums.map((album) => (
                    <Album key={album.id} album={album}/>
                ))}
            </div>
            <AlbumForm />
        </div>
    );
}

export default Albums;