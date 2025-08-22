// Function to calculate time spent in each of 4 zones over a variable time window,
// based on proportional allocation from event counts per zone.
// Assumptions:
// - Input: array of events, each with { timestamp: Date, zone: number }
// - Events may not be sorted; we sort them.
// - Window: startTime = endTime - windowDurationMs, but pass start and end.
// - If events in window, time allocated proportionally to count of events in each zone.
// - If no events in window, allocate entire window to the zone of the last event before startTime, if exists.
// - Output: object with zone keys and time in seconds spent in each.
// - This approximates time spent assuming events are logged at a constant rate across zones.

function calculateTimeInZones(events, startTime, endTime) {
  const windowDuration = endTime - startTime;
  if (windowDuration <= 0) return { 1: 0, 2: 0, 3: 0, 4: 0 };

  // Sort events by timestamp
  events.sort((a, b) => a.timestamp - b.timestamp);

  // Find relevant events in [startTime, endTime). Only needed if we have all events rather than a few
  const relevantEvents = events.filter(event => event.timestamp >= startTime && event.timestamp < endTime);

  const timeInZones = { 1: 0, 2: 0, 3: 0, 4: 0 };

  if (relevantEvents.length > 0) {
    // Count events per zone
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    relevantEvents.forEach(event => {
      if (counts[event.zone] !== undefined) {
        counts[event.zone]++;
      }
    });

    const totalEvents = relevantEvents.length;

    // Allocate time proportionally
    Object.keys(counts).forEach(zone => {
      timeInZones[zone] = (counts[zone] / totalEvents) * windowDuration / 1000;
    });
  } else {
    // No events in window: find last event before startTime
    const lastEventBefore = events
      .filter(event => event.timestamp < startTime)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    if (lastEventBefore) {
      const zone = lastEventBefore.zone;
      if (timeInZones[zone] !== undefined) {
        timeInZones[zone] = windowDuration;
      }
    }
    // Else, all 0 (no known zone)
  }

  return timeInZones;
}

// Example usage:
const events = [
  { timestamp: new Date('2023-01-01T10:00:00'), zone: 1, event: 'T' }, // before window
  { timestamp: new Date('2023-01-01T10:05:02'), zone: 2, event: 'T' },
  { timestamp: new Date('2023-01-01T10:05:03'), zone: 2, event: 'T' },
  { timestamp: new Date('2023-01-01T10:05:04'), zone: 3, event: 'T' },
  { timestamp: new Date('2023-01-01T10:05:10'), zone: 4, event: 'T' } // after window
];

const endTime = new Date('2023-01-01T10:05:05');
const startTime = new Date(endTime - 5000); // 5 seconds window

const result = calculateTimeInZones(events, startTime, endTime);
console.log(result);
// If only one event in window, e.g., remove others, only {10:05:02, zone:2}, then {2:5}

// If no events in window, but previous zone 1, then {1:5}. Not sure if this is still working. Testing Required

// To update in real-time: Call this function periodically (e.g., every 5s) with current endTime = new Date(), startTime = new Date(endTime - windowMs), and append new events to the array as they arrive.
// Keep events array with historical data, or prune old ones if too many (e.g., keep only last hour). Currently only keeping 5s selection
