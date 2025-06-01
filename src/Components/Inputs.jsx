import {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";


export default function Inputs({ time, isRunning, event }) {
    const [team, setTeam] = useState(null);
    const [zone, setZone] = useState(null);
    const [rowData, setRowData] = useState([]);
    const eventIdRef = useRef(1);

    const formatTime = (totalSeconds) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
    
    function addEvent(eventType) {
        const newEvent = {
            eventID: eventIdRef.current ,
            time: formatTime(time),
            team,
            zone,
            event: eventType
        };
        eventIdRef.current += 1;
        setRowData(prev => [...prev, newEvent]);
    }


    const [colDefs,  setColDefs] = useState([
        { field: "eventID" },
        { field: "time" },
        { field: "team"},
        { field: "zone" },
        { field: "event" }
    ]);
    
return (
    <section>
            <div className="events">
                <h>Team</h>
                <div className="events_button">
                    <button onClick={() => setTeam("Reds")}>Reds</button>
                    <button onClick={() => setTeam("enemyTeam")}>Opposition</button>
                </div>
                <br/>
                <h>Field Zones (Queensland Reds)</h>
                <div className="events_button">
                    <button onClick={() => setZone("Reds A")}>Reds A</button>
                    <button onClick={() => setZone("Reds B")}>Reds B</button>
                    <button onClick={() => setZone("Reds C")}>Reds C</button>
                    <button onClick={() => setZone("Reds D")}>Reds D</button>
                </div>
                <br/>
                <h>Field Zones (Opposition)</h>
                <div className="events_button">
                    <button onClick={() => setZone("Opposition A")}>Opposition A</button>
                    <button onClick={() => setZone("Opposition B")}>Opposition B</button>
                    <button onClick={() => setZone("Opposition C")}>Opposition C</button>
                    <button onClick={() => setZone("Opposition D")}>Opposition D</button>
                </div>
                <br/>
                <h>Event</h>
                <div className="events_button">
                    <button onClick={() => addEvent("Ruck")}>Ruck</button>
                    <button onClick={() => addEvent("Pass")}>Pass</button>
                    <button onClick={() => addEvent("Kick")}>Kick</button>
                    <button onClick={() => addEvent("Tackle")}>Tackle</button>
                </div>
            </div>
            <div className="main_container_grid">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
    </section>
)
}
        