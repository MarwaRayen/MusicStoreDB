import { useEffect, useState } from "react";

// component to display the home page
import Track from "../components/Track";
import TrackForm from "../components/TrackForm";

const Tracks = () => {
    const [tracks, setTracks] = useState(null);

    useEffect(() => {

        
        const fetchTracks = async () => {
            const response = await fetch('/tracks');
            const data = await response.json();

            if (response.ok) {
                setTracks(data);
                console.log(tracks);
            }
        }

        fetchTracks();
        console.log(tracks);
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {tracks && tracks.map((track) => (
                    <Track key={track.id} track={track}/>
                ))}
            </div>
            <TrackForm />
        </div>
    );
}

export default Tracks;