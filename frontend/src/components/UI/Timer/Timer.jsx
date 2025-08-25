import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

export default function Timer({ time, setTime, isRunning, setIsRunning }) {
    const intervalRef = useRef(null);
    
    const getMinutes = (seconds) => String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const getSeconds = (seconds) => String(seconds % 60).padStart(2, '0');

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };

    const handleTimeChange = (unit, value) => {
        const numValue = parseInt(value, 10) || 0;
        let currentH = Math.floor(time / 3600);
        let currentM = Math.floor((time % 3600) / 60);
        let currentS = time % 60;
        let newTotalSeconds = 0;
        if (unit === 'm') {
            newTotalSeconds = (currentH * 3600) + (numValue * 60) + currentS;
        } else if (unit === 's') {
            newTotalSeconds = (currentH * 3600) + (currentM * 60) + numValue;
        }
        setTime(newTotalSeconds);
    };

    const adjustSeconds = (amount) => {
        setTime((prev) => Math.max(0, prev + amount));
    };

    // Start/Stop time on Spacebar press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsRunning((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsRunning]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, setTime]);

    return (
        <div className="timer_component_wrapper">
            <div className="time_display_container">
                <div className="manual_controls">
                <button onClick={toggleTimer} className="start_stop_button">
                    {isRunning ? '⏸' : '▶'}
                </button>
                </div>
                <input
                    type="number"
                    value={getMinutes(time)}
                    onChange={(e) => handleTimeChange('m', e.target.value)}
                    readOnly={isRunning}
                    className="time_input"
                />
                <span>:</span>
                <input
                    type="number"
                    value={getSeconds(time)}
                    onChange={(e) => handleTimeChange('s', e.target.value)}
                    readOnly={isRunning}
                    className="time_input"
                />
            <div className="time_display_container">
                <div className="seconds_controls">
                    <button onClick={() => adjustSeconds(1)} disabled={isRunning}>▲</button>
                    <div>
                    <button onClick={() => adjustSeconds(-1)} disabled={isRunning}>▼</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}