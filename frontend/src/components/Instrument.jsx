
const { useState } = require("react");

const Instrument = ({ instru }) => {


    const [val, setVal] = useState('');
    const [attr, setAttr] = useState('');


    const handleSupp = async (e) => {
        const rev = instru.value.rev
        const key = instru.id

        e.preventDefault();

        const response = await fetch(`/instrument/delete/${key}`, {
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
        const rev = instru.value.rev;
        const att = attr;
        const newVal = val;
        const response = await fetch(`/instrument/update${instru.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev, att, newVal}),
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
        <h4>{instru.value.instrument}</h4>
        <p><strong>Type: </strong>{instru.value.type}</p>
        <p><strong>Edition: </strong>{instru.value.edition}</p>
        <p><strong>Price: </strong>{instru.value.price}</p>
        <p>{instru.createdAt}</p>
        <form className="create mt-5" onSubmit={handleSupp}>
            {/* <input type="hidden" value="<%= instru.value.rev %>" name="rev"/> */}
           <button className="text-center bg-red-500 text-white py-2 px-4 rounded text-[10px]">supprimer</button>
        </form>
        <form className="create mt-5" onSubmit={handleModif}>
            <select name="att" value={attr} onChange={(e) => setAttr(e.target.attr)}>
                <option value="Select an attribute..." disabled selected>Select an attribute...</option>
                <option value="type" name="type">type</option>
                <option value="edition"  name="edition">edition</option>
                <option value="price" name="price">price</option>
            </select>
            
            <input type="text"  name="newVal" value={val} onChange={(e) => setVal(e.target.value)}/>
            
            <button className="text-center text-white py-2 px-4 rounded text-[10px]"> modifier </button>
        </form>
      </div>
    )
  }
  
  export default Instrument;