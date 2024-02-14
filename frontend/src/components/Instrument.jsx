const Instrument = ({ instru }) => {


    const rev =  instru.value.rev    
    const id = instru.id

    const handleSupp = async (e) => {
        e.preventDefault();

        console.log(rev);
        console.log(id);
        
        const response = await fetch(`/instrument/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev}),
        });
        const data = await response.json();
        console.log(data);
    }

    const handleModif = async (e) => {
        e.preventDefault();
        const rev = instru.value.rev;
        const att = e.target.att.value;
        const newVal = e.target.newVal.value;
        const response = await fetch(`/instrument/update/${instru.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rev, att, newVal}),
        });
        const data = await response.json();
        console.log(data);
    }
    return (
      <div className="workout-details">
        <h4>{instru.value.instrument}</h4>
        <p><strong>Type: </strong>{instru.value.type}</p>
        <p><strong>Edition: </strong>{instru.value.edition}</p>
        <p><strong>Price: </strong>{instru.value.price}</p>
        <p>{instru.createdAt}</p>
        <form className="create mt-5" action={handleSupp}>
            <input type="hidden" value="<%= instru.value.rev %>" name="rev"/>
            
           <button className="text-center bg-red-500 text-white py-2 px-4 rounded text-[10px]">supprimer</button>
        </form>
        <form className="create mt-5" action={handleModif}>
            <select name="att" id="list" value="attribut">
                <option value="Select an attribute..." disabled selected>Select an attribute...</option>
                <option value="type" name="type">type</option>
                <option value="edition"  name="edition">edition</option>
                <option value="price" name="price">price</option>
            </select>
            
            <input type="text"  name="newVal" />
            
            <button className="text-center text-white py-2 px-4 rounded text-[10px]">modifier</button>
        </form>
      </div>
    )
  }
  
  export default Instrument;