import {useEffect, useRef, useState} from "react";
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
        { field: "eventID",flex: 1, filter: true, sort: 'desc',  minWidth: 100 },
        { field: "time",flex: 1, minWidth: 100  },
        { field: "team",flex: 1, minWidth: 100 },
        { field: "zone",flex: 1, minWidth: 100  },
        { field: "event",flex: 1, minWidth: 100  }
    ]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();

            // Team shortcuts
            if (key === 'r' && event.shiftKey) {
                setTeam("Reds");
            } else if (key === 'o' && event.shiftKey) {
                setTeam("enemyTeam");

                // Reds zones
            } else if (key === 'a' && !event.shiftKey) {
                setZone("Reds A");
            } else if (key === 'b' && !event.shiftKey) {
                setZone("Reds B");
            } else if (key === 'c' && !event.shiftKey) {
                setZone("Reds C");
            } else if (key === 'd' && !event.shiftKey) {
                setZone("Reds D");

                // Opposition zones
            } else if (key === 'a' && event.shiftKey) {
                setZone("Opposition A");
            } else if (key === 'b' && event.shiftKey) {
                setZone("Opposition B");
            } else if (key === 'c' && event.shiftKey) {
                setZone("Opposition C");
            } else if (key === 'd' && event.shiftKey) {
                setZone("Opposition D");

                // Events
            } else if (key === 'r' && !event.shiftKey) {
                addEvent("Ruck");
            } else if (key === 'p' && !event.shiftKey) {
                addEvent("Pass");
            } else if (key === 'k' && !event.shiftKey) {
                addEvent("Kick");
            } else if (key === 't' && !event.shiftKey) {
                addEvent("Turnover");
            } else if (key === 'j' && !event.shiftKey) {
                addEvent("Kick collection");
            } else if (key === 'v' && !event.shiftKey) {
                addEvent("Advantage");
            } else if (key === 'e' && !event.shiftKey) {
                addEvent("Penalty")
            } else if (key === 'l' && !event.shiftKey) {
                addEvent("Lineout")
            } else if (key === 's' && !event.shiftKey) {
                addEvent("Scrum")
            } else if (key === 'm' && !event.shiftKey) {
                addEvent("Maul")
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [team, zone, time]);
    
    
return (
    <section>
            <div className="events">
                <h>Team</h>
                <div className="events_button">
                    <button onClick={() => setTeam("Reds")}>Reds (Shift + R)</button>
                    <button onClick={() => setTeam("enemyTeam")}>Opposition (Shift + O)</button>
                </div>
                <br/>
                <h>Field Zones (Queensland Reds)</h>
                <div className="events_button">
                    <button onClick={() => setZone("Reds A")}>Reds A (A)</button>
                    <button onClick={() => setZone("Reds B")}>Reds B (B)</button>
                    <button onClick={() => setZone("Reds C")}>Reds C (C)</button>
                    <button onClick={() => setZone("Reds D")}>Reds D (D)</button>
                </div>
                <br/>
                <h>Field Zones (Opposition)</h>
                <div className="events_button">
                    <button onClick={() => setZone("Opposition A")}>Opposition A (Shift + A)</button>
                    <button onClick={() => setZone("Opposition B")}>Opposition B (Shift + B)</button>
                    <button onClick={() => setZone("Opposition C")}>Opposition C (Shift + C)</button>
                    <button onClick={() => setZone("Opposition D")}>Opposition D (Shift + D)</button>
                </div>
                <br/>
                <h>Event</h>
                <div className="events_button">
                    <button onClick={() => addEvent("Ruck")}>Ruck (R)</button>
                    <button onClick={() => addEvent("Pass")}>Pass (P)</button>
                    <button onClick={() => addEvent("Kick")}>Kick (K)</button>
                    <button onClick={() => addEvent("Kick collection")}>Kick collection (J)</button>
                    <button onClick={() => addEvent("Turnover")}>Turnover (T)</button>
                    <button onClick={() => addEvent("Advantage")}>Advantage (V)</button>
                    <button onClick={() => addEvent("Penalty")}>Penalty (E)</button>
                    <button onClick={() => addEvent("Lineout")}>Lineout (L)</button>
                    <button onClick={() => addEvent("Scrum")}>Scrum (S)</button>
                    <button onClick={() => addEvent("Maul")}>Maul (M)</button>
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
        