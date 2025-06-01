import {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";


export default function Inputs() {
    const eventIdRef = useRef(1);
    function addEvent(eventType) {
        const newEvent = {
            eventID: eventIdRef.current ,
            time: "0:00",
            team,
            zone,
            event: eventType
        };
        eventIdRef.current += 1;
        setRowData(prev => [...prev, newEvent]);
    }

    const [team, setTeam] = useState(null);
    const [zone, setZone] = useState(null);


    const [rowData, setRowData] = useState([]);
    const [colDefs,  setColDefs] = useState([
        { field: "eventID" },
        { field: "time" },
        { field: "team"},
        { field: "zone" },
        { field: "event" }
    ]);
    
return (
    <section>
        <div className="events" style={{position: 'relative'}}>
            <div>
            <button onClick={() => setTeam("Reds")}>Reds</button>
            <button onClick={() => setTeam("enemyTeam")}>Opposition</button>
            </div>
            <br />
            <div>
            <button onClick={() => setZone("Reds A")}>Reds A</button>
            <button onClick={() => setZone("Reds B")}>Reds B</button>
            <button onClick={() => setZone("Reds C")}>Reds c</button>
            <button onClick={() => setZone("Reds D")}>Reds D</button>
            </div>
            <br />
            <div>
            <button onClick={() => setZone("Opposition A")}>Opposition A</button>
            <button onClick={() => setZone("Opposition B")}>Opposition B</button>
            <button onClick={() => setZone("Opposition C")}>Opposition C</button>
            <button onClick={() => setZone("Opposition D")}>Opposition D</button>
            </div>
            <br />
            <div>
            <button onClick={() => addEvent("Ruck")}>Ruck</button>
            <button onClick={() => addEvent("Pass")}>Pass</button>
            <button onClick={() => addEvent("Kick")}>Kick</button>
            <button onClick={() => addEvent("Tackle")}>Tackle</button>
            </div>
        </div>
        <div style={{ height: 300, width: '50%', position: 'relative' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    </section>
    )
}
        