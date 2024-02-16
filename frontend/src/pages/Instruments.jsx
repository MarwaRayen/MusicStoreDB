import { useEffect, useState } from "react";

// component to display the home page
import Instrument from "../components/Instrument";
import InstrumentForm from "../components/InstrumentForm";

const Instruments = () => {
    const [instruments, setInstrument] = useState(null);

    useEffect(() => {

        
        const fetchInstruments = async () => {
            const response = await fetch('/instruments');
            const data = await response.json();

            if (response.ok) {
                setInstrument(data);
                console.log(instruments);
            }
        }

        fetchInstruments();
        console.log(instruments);
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {instruments && instruments.map((instrument) => (
                    <Instrument key='instrument.key' instru={instrument}/>
                ))}
            </div>
            <InstrumentForm />
        </div>
    );
}

export default Instruments;