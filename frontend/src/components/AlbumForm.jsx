import { useState } from "react";

const AlbumForm = () => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [tracks, setTracks] = useState('');
    const [release, setRelease] = useState('');
    const [price, setPrice] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAlbum = { name, artist, genre, tracks, release, price};
        const response = await fetch('/album/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAlbum),
        });

        const data = await response.json();

        if (!response.ok) {
            setErr(data.error);
        } else {
            setName('');
            setArtist('');
            setGenre('');
            setTracks('');
            setRelease('');
            setPrice('');
            setErr(null);
            console.log('Album added');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new instrument</h3>
            <label>Track title:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Artist name:</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <label>genre:</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <label>Number of tracks:</label>
            <input type="number" value={tracks} onChange={(e) => setTracks(e.target.value)} />
            <label>Edition:</label>
            <input type="text" value={release} onChange={(e) => setRelease(e.target.value)} />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button>Add instrument</button>
            {err && <p>{err}</p>}
        </form>
    );
};

export default AlbumForm;


