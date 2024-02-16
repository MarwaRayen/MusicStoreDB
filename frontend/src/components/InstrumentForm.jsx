import { useState } from "react";

const InstrumentForm = () => {
    const [instrument, setInstrument] = useState('');
    const [type, setType] = useState('');
    const [edition, setEdition] = useState('');
    const [price, setPrice] = useState('');
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newInstrument = { instrument, type, edition, price };
        const response = await fetch('/instrument/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInstrument),
        });

        const data = await response.json();

        if (!response.ok) {
            setErr(data.error);
        } else {
            setInstrument('');
            setType('');
            setEdition('');
            setPrice('');
            setErr(null);
            console.log('Instrument added');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3><b>Add a new instrument</b></h3>
            <label>Instrument name:</label>
            <input type="text" value={instrument} onChange={(e) => setInstrument(e.target.value)} />
            <label>Type:</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            <label>Edition:</label>
            <input type="text" value={edition} onChange={(e) => setEdition(e.target.value)} />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button class="hover:bg-[#9290C3]">Add instrument</button>
            {err && <p>{err}</p>}
        </form>
    );
};

export default InstrumentForm;
