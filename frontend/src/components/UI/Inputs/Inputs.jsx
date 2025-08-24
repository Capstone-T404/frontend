import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Inputs.css'

export default function Inputs({ time }) {
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
            // Ignore key presses if the user is typing in the timer inputs
            if (e.target.tagName.toLowerCase() === 'input') return;

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
            <p className="hero_subtitle">Selected Team: <strong>{team || 'None'}</strong> | Selected Zone: <strong>{zone || 'None'}</strong></p>
            <div className="card">
                <h2>Team</h2>
                <div className="events_button">
                    <button onClick={() => setTeam("Reds")} className={team === 'Reds' ? 'selected' : ''}>Reds (Shift + R)</button>
                    <button onClick={() => setTeam("enemyTeam")} className={team === 'enemyTeam' ? 'selected' : ''}>Opposition (Shift + O)</button>
                </div>
                <h2>Field Zones (Queensland Reds)</h2>
                <div className="events_button">
                    <button onClick={() => setZone("Reds A")} className={zone === 'Reds A' ? 'selected' : ''}>Reds A (A)</button>
                    <button onClick={() => setZone("Reds B")} className={zone === 'Reds B' ? 'selected' : ''}>Reds B (B)</button>
                    <button onClick={() => setZone("Reds C")} className={zone === 'Reds C' ? 'selected' : ''}>Reds C (C)</button>
                    <button onClick={() => setZone("Reds D")} className={zone === 'Reds D' ? 'selected' : ''}>Reds D (D)</button>
                </div>
                <h2>Field Zones (Opposition)</h2>
                <div className="events_button">
                    <button onClick={() => setZone("Opposition A")} className={zone === 'Opposition A' ? 'selected' : ''}>Opposition A (Shift + A)</button>
                    <button onClick={() => setZone("Opposition B")} className={zone === 'Opposition B' ? 'selected' : ''}>Opposition B (Shift + B)</button>
                    <button onClick={() => setZone("Opposition C")} className={zone === 'Opposition C' ? 'selected' : ''}>Opposition C (Shift + C)</button>
                    <button onClick={() => setZone("Opposition D")} className={zone === 'Opposition D' ? 'selected' : ''}>Opposition D (Shift + D)</button>
                </div>
                <h2>Event</h2>
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
            <div className="card">
                <h2>Game Events</h2>
                {/* Your existing HTML table for events goes here */}
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th><th>Time</th><th>Team</th><th>Zone</th><th>Event</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rowData.length > 0 ? (
                            rowData.slice().reverse().map(row => (
                                <tr key={row.eventID}>
                                    <td>{row.eventID}</td><td>{row.time}</td><td>{row.team}</td><td>{row.zone}</td><td>{row.event}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No events recorded yet.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}