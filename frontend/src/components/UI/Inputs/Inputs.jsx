import React, {useState, useEffect, useRef, useCallback} from 'react';
import './Inputs.css'
import Button from "../Button/Button";


const allZones = [
    "Reds A", "Reds B","Reds M", "Reds C", "Reds D",
    "Opposition D", "Opposition C", "Opposition M", "Opposition B", "Opposition A"
];

export default function Inputs({time, isRunning, setIsRunning}) {
    const [team, setTeam] = useState('Reds');
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
        setIsRunning(true);
        const newEvent = {
            eventID: eventIdRef.current,
            time: formatTimeForEvent(time),
            team,
            zone,
            event: eventType
        };
        eventIdRef.current += 1;
        setRowData(prev => [...prev, newEvent]);
    }, [time, team, zone, setIsRunning]);

    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName.toLowerCase() === 'input') return;

            // Handle Start/Stop on Spacebar press separately
            if (e.code === 'Space') {
                e.preventDefault();
                setIsRunning((prev) => !prev);
                return;
            }

            switch (e.key) {
                default:
                    break;
                case 'Tab':
                    e.preventDefault();
                    setTeam(currentTeam => currentTeam === 'Reds' ? 'enemyTeam' : 'Reds');
                    break;
                // Zone Cycling Shortcuts
                case 'ArrowRight':
                case 'ArrowLeft': {
                    e.preventDefault(); 
                    const currentIndex = allZones.indexOf(zone);
                    let nextIndex;

                    if (e.key === 'ArrowRight') {
                        // Move to the next zone (Currently this will wrap all the way around)
                        nextIndex = (currentIndex + 1) % allZones.length;
                    } else { // This handles 'ArrowLeft'
                        // If at the start this will wrap to the end
                        if (currentIndex <= 0) {
                            nextIndex = allZones.length - 1;
                        } else {
                            nextIndex = currentIndex - 1;
                        }
                    }
                    setZone(allZones[nextIndex]);
                    break;
                }
                // Event shortcuts
                case 'r':addEvent("Ruck");break;
                case 'p':addEvent("Pass");break;
                case 'k':addEvent("Kick");break;
                case 't':addEvent("Turnover");break;
                case 'j':addEvent("Kick collection");break;
                case 'v':addEvent("Advantage");break;
                case 'e':addEvent("Penalty");break;
                case 'l':addEvent("Lineout");break;
                case 's':addEvent("Scrum");break;
                case 'm':addEvent("Maul");break;
            }
        }
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
            }, [addEvent, setIsRunning, zone]);

    return {
        TeamSelector: (
            <div className="team-selector">
                <Button
                    variant={team === 'Reds' ? 'primary' : 'secondary'}
                    size="lg"
                    
                    onClick={() => setTeam(currentTeam => currentTeam === 'Reds' ? 'enemyTeam' : 'Reds')}
                >
                    {team === 'Reds' ? 'Reds' : 'Opposition'}
                </Button>
            </div>
        ),
        ZoneSelector: (() => {
            const zoneLabels = ['A', 'B', 'M', 'C', 'D', 'D', 'C', 'M', 'B', 'A'];
            const zoneValues = [
                "Reds A", "Reds B","Reds M", "Reds C", "Reds D",
                "Opposition D", "Opposition C", "Opposition M", "Opposition B", "Opposition A"
            ];
            return (
                <div className="zone-selector">
                    {zoneLabels.map((label, index) => (
                        <Button
                            key={index}
                            size="lg"
                            variant={zone === zoneValues[index] ? 'primary' : 'secondary'}
                            onClick={() => setZone(zoneValues[index])}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            )
        })(),
        EventButtons: (
            <div className="card">
                <h2 className="section-title">Event</h2>
                <div className="event-buttons-grid">
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Ruck")}>Ruck (R)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Pass")}>Pass (P)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Kick")}>Kick (K)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Turnover")}>Turnover (T)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Kick collection")}>Kick collection (J)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Advantage")}>Advantage (V)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Penalty")}>Penalty (E)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Lineout")}>Lineout (L)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Scrum")}>Scrum (S)</Button>
                    <Button size="sm" variant="tertiary" onClick={() => addEvent("Maul")}>Maul (M)</Button>
                </div>
            </div>
        ),
        EventsTable: (
            <div className="card card-full-height">
                <h2 className="section-title">Game Events</h2>
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
        )
    };
}