
const { useState } = require("react");

const Track = ({ track }) => {


    const [val, setVal] = useState('');
    const [attr, setAttr] = useState('artist');


    const handleSupp = async (e) => {
        const rev = track.value.rev
        const key = track.id

        e.preventDefault();

        const response = await fetch(`/track/delete/${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev}),
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
        const rev = track.value.rev;
        const att = attr;
        const newVal = val;
        const response = await fetch(`/track/update/${track.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev, att, newVal}),
        });
        const data = await response.json();
        console.log(data);
        if(!response.ok){

            console.log(data.error);
        }else{
            setVal('');
            setAttr('artist');
        }
    }
    return (
      <div className="workout-details">
        <h3><b>{track.value.name}</b></h3>
        <p><strong>artist: </strong>{track.value.artist}</p>
        <p><strong>support Type: </strong>{track.value.supportType}</p>
        <p><strong>genre: </strong>{track.value.genre}</p>
        <p><strong>Album: </strong>{track.value.album}</p>
        <p><strong>Release: </strong>{track.value.releaseDate}</p>
        <p><strong>Price: </strong>{track.value.price}</p>
        <p>{track.createdAt}</p>
        <form className="create mt-5" onSubmit={handleSupp}>
            {/* <input type="hidden" value="<%= instru.value.rev %>" name="rev"/> */}
           <button className="text-center bg-[#E78895] text-white py-2 px-4 rounded text-[10px] hover:bg-[#EEA5A6]">supprimer</button>
        </form>
        <form className="create mt-5" onSubmit={handleModif}>
            <select name="att" value={attr} onChange={(e) => setAttr(e.target.value)}>
                <option value="Select an attribute..." disabled selected>Select an attribute...</option>
                <option value="artist" name="artist">artist</option>
                <option value="genre"  name="genre">genre</option>
                <option value="price" name="price">price</option>
            </select>
            
            <input type="text"  name="newVal" value={val} onChange={(e) => setVal(e.target.value)}/>
            
            <button className="text-center text-white py-2 px-4 rounded text-[10px] hover:bg-[#9290C3]"> modifier </button>
        </form>
      </div>
    )
  }
  
  export default Track;