import React, { useState, useEffect, useRef } from 'react';

export default function Timer({ time, setTime, isRunning, setIsRunning }) {
    const intervalRef = useRef(null);

    // Format time as HH:MM:SS
    const formatTime = (totalSeconds) => {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    // Start/Stop timer on spacebar press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                setIsRunning((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Manual time input
    // const handleManualChange = (e) => {
    //     const value = e.target.value;
    //     const [hrs, mins, secs] = value.split(':').map(Number);
    //     setTime((hrs * 3600) + (mins * 60) + secs);
    // };


    return (
        <div>
            <h1>Timer</h1>
            <br />
            <div className="container">
                <h1><strong />{formatTime(time)}</h1>
            </div>
            {/*<input*/}
            {/*    // type="text"*/}
            {/*    // placeholder="hh:mm:ss"*/}
            {/*    // onBlur={handleManualChange}*/}
            {/*/>*/}
            <br />
            <p>Press <strong>Spacebar</strong> to Start/Stop</p>
        </div>
    );
}


