import React from "react";

function Test() {
  const handleClick = () => {

  };

function test() {
  fetch('/routes/events/test', {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error', response.status);
      }
      return response.json();
    })
    .then(data => console.log("response:", data))
    .catch(error => {console.error('Error:', error);});
}

function pushGameEvent(event){
  fetch('/routes/events/pushGameEvent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error', response.status);
      }
      return response.json();
    })
    .then(data => console.log("response:", data))
    .catch(error => {console.error('Error:', error);});
}

function getAllGameEventData(){
    fetch('/routes/events/getAllGameEventData', {
        method: 'GET',
    })
    .then(response=> {
        if(!response.ok){
            throw new Error('Error', response.status);
        }
        return response.json();
    }).then(data => console.log("response:", data))
    .catch(error => {console.error('Error:', error);});
}

  return (
    <div>
        {/* This button represents how to call the test handler */}
    {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <button onClick={test}>Click Me</button>
    </div> */}
    {/* This button represents how to call the pushGameEvent handler */}
    <div>
      <button onClick={() => pushGameEvent({event_type:"R",event_zone:"A",username:'test_user',game_id:'3',game_time:'12:00'})}>push game event</button>
    </div>
    {/* This button represents how to call the getAllGameEventData */}
    <div>
      <button onClick={getAllGameEventData}>get game event data</button>
    </div>
    </div>
  );
}

export default Test;
