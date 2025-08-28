import React, {useState, useEffect, useRef, useCallback} from 'react';
import './Inputs.css'
import Button from "../Button/Button";
import {Space} from "lucide-react";


export default function Inputs({time, isRunning, setIsRunning}) {
    const [team, setTeam] = useState(null);
    const [zone, setZone] = useState(null);
    const [rowData, setRowData] = useState([]);
    const eventIdRef = useRef(1);

    const formatTimeForEvent = (totalSeconds) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    const addEvent = useCallback((eventType) => {
        if (!team || !zone) {
            alert("Please select a Team and a Zone before adding an event.");
            return;
        }
        const newEvent = {
            eventID: eventIdRef.current,
            time: formatTimeForEvent(time),
            team,
            zone,
            event: eventType
        };
        eventIdRef.current += 1;
        setRowData(prev => [...prev, newEvent]);
    }, [time, team, zone]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName.toLowerCase() === 'input') return;
            /*
            The line below if un-commented will trigger the timer to start when an event key is pressed
             */
            // setIsRunning((prev) => !prev);
            const key = e.key.toLowerCase();

            // Team shortcuts
            if (key === 'r' && e.shiftKey) setTeam("Reds");
            else if (key === 'o' && e.shiftKey) setTeam("enemyTeam");
            // Zone shortcuts
            else if (key === 'a' && !e.shiftKey) setZone("Reds A");
            else if (key === 'b' && !e.shiftKey) setZone("Reds B");
            else if (key === 'c' && !e.shiftKey) setZone("Reds C");
            else if (key === 'd' && !e.shiftKey) setZone("Reds D");
            else if (key === 'a' && e.shiftKey) setZone("Opposition A");
            else if (key === 'b' && e.shiftKey) setZone("Opposition B");
            else if (key === 'c' && e.shiftKey) setZone("Opposition C");
            else if (key === 'd' && e.shiftKey) setZone("Opposition D");
            // Event shortcuts
            else if (key === 'r' && !e.shiftKey) addEvent("Ruck");
            else if (key === 'p' && !e.shiftKey) addEvent("Pass");
            else if (key === 'k' && !e.shiftKey) addEvent("Kick");
            else if (key === 't' && !e.shiftKey) addEvent("Turnover");
            else if (key === 'j' && !e.shiftKey) addEvent("Kick collection");
            else if (key === 'v' && !e.shiftKey) addEvent("Advantage");
            else if (key === 'e' && !e.shiftKey) addEvent("Penalty");
            else if (key === 'l' && !e.shiftKey) addEvent("Lineout");
            else if (key === 's' && !e.shiftKey) addEvent("Scrum");
            else if (key === 'm' && !e.shiftKey) addEvent("Maul");
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addEvent]);

    return (
        <section className="content-area">
            <div className="card">
                <p className="selection-status">Selected Team: <strong>{team || 'None'}</strong> | Selected
                    Zone: <strong>{zone || 'None'}</strong></p>
                <h2 className="section-title">Team</h2>
                <div className="button-group">
                    <Button variant={team === 'Reds' ? 'primary' : 'secondary'} onClick={() => setTeam("Reds")}> Reds
                        (Shift + R)</Button>
                    <Button variant={team === 'enemyTeam' ? 'primary' : 'secondary'}
                            onClick={() => setTeam("enemyTeam")}> Opposition (Shift + O)</Button>
                </div>

                {/*Reds Zones*/}
                <h2 className="section-title">Field Zones (Queensland Reds)</h2>
                <div className="button-group">
                    <Button size="sm" variant={zone === 'Reds A' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Reds A")}>Reds A (A)</Button>
                    <Button size="sm" variant={zone === 'Reds B' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Reds B")}>Reds B (B)</Button>
                    <Button size="sm" variant={zone === 'Reds C' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Reds C")}>Reds C (C)</Button>
                    <Button size="sm" variant={zone === 'Reds D' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Reds D")}>Reds D (D)</Button>
                </div>

                {/*Opposition Zones*/}
                <h2 className="section-title">Field Zones (Opposition)</h2>
                <div className="button-group">
                    <Button size="sm" variant={zone === 'Opposition A' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Opposition A")}>Opposition A (Shift + A)</Button>
                    <Button size="sm" variant={zone === 'Opposition B' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Opposition B")}>Opposition B (Shift + B)</Button>
                    <Button size="sm" variant={zone === 'Opposition C' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Opposition C")}>Opposition C (Shift + C)</Button>
                    <Button size="sm" variant={zone === 'Opposition D' ? 'primary' : 'secondary'}
                            onClick={() => setZone("Opposition D")}>Opposition D (Shift + D)</Button>
                </div>
            </div>

            <div className="card">
                {/*Event Buttons*/}
                <h2 className="section-title">Event</h2>
                <div className="button-group">
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Ruck")} disabled={!isRunning}>Ruck
                        (R)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Pass")} disabled={!isRunning}>Pass
                        (P)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Kick")} disabled={!isRunning}>Kick
                        (K)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Kick collection")}
                            disabled={!isRunning}>Kick collection (J)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Turnover")} disabled={!isRunning}>Turnover
                        (T)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Advantage")} disabled={!isRunning}>Advantage
                        (V)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Penalty")} disabled={!isRunning}>Penalty
                        (E)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Lineout")} disabled={!isRunning}>Lineout
                        (L)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Scrum")} disabled={!isRunning}>Scrum
                        (S)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Maul")} disabled={!isRunning}>Maul
                        (M)</Button>
                </div>
            </div>
            <div className="card">
                <h2>Game Events</h2>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Time</th>
                            <th>Team</th>
                            <th>Zone</th>
                            <th>Event</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rowData.length > 0 ? (
                            rowData.slice().reverse().map(row => (
                                <tr key={row.eventID}>
                                    <td>{row.eventID}</td>
                                    <td>{row.time}</td>
                                    <td>{row.team}</td>
                                    <td>{row.zone}</td>
                                    <td>{row.event}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No events recorded yet.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}