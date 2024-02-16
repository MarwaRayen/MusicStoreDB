import { useState } from "react";

const TrackForm = () => {
    
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState('');
    const [supportType, setSupportType] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [album, setAlbum] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTrack = { name, artist, supportType, genre, album, releaseDate, price };
        const response = await fetch('/track/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTrack),
        });

        const data = await response.json();

        if (!response.ok) {
            setErr(data.error);
        } else {
            setName('');
            setArtist('');
            setGenre('');
            setAlbum('');
            setSupportType('');
            setReleaseDate('');
            setPrice('');
            setErr(null);
            console.log('Track added');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3><b>Add a new track</b></h3>
            <label>Track name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Artist:</label>
            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <label>Support Type:</label>
            <input type="text" value={supportType} onChange={(e) => setSupportType(e.target.value)} />
            <label>Genre:</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <label>Album:</label>
            <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />
            <label>Release:</label>
            <input type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button class="hover:bg-[#9290C3]">Add track</button>
            {err && <p>{err}</p>}
        </form>
    );
};

export default TrackForm;


  