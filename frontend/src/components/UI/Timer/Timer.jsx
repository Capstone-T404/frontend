import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';


export default function Timer() {
    const [time, setTime] = useState(0); // Time in Seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Format time HH:MM:SS
    const formatTime = (totalSeconds) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
    
    /*
    After doing some testing I discovered that the spacebar function doesn't work with firefox, 
    will need to test edge and safari to see if this is the case with both of them as well or if it
    isolated to firefox
     */
    // Start/Stop time on spacebar press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                setIsRunning((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Timer Logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev +1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    },[isRunning]);

    return (
        <div className="timer_container">
            <div >
                <span className="time_display">{formatTime(time)}</span>
            </div>
        </div>
    );
}

