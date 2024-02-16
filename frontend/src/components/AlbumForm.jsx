import { useState } from "react";

const AlbumForm = () => {
    
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState('');
    const [supportType, setSupportType] = useState('');
    const [numberTracks, setNumberTracks] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newAlbum = { name, artist, supportType, genre, numberTracks, releaseDate, price };
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
            setPrice('');
            setSupportType('');
            setNumberTracks('');
            setReleaseDate('');
            setErr(null);
            console.log('Album added');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3><b>Add a new Album</b></h3>
            <label>Album name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Artist:</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <label>Support Type:</label>
            <input type="text" value={supportType} onChange={(e) => setSupportType(e.target.value)} />
            <label>Genre:</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <label>Number of Tracks:</label>
            <input type="number" value={numberTracks} onChange={(e) => setNumberTracks(e.target.value)} />
            <label>Release:</label>
            <input type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button class="hover:bg-[#9290C3]">Add track</button>
            {err && <p>{err}</p>}
        </form>
    );
};

export default AlbumForm;


  