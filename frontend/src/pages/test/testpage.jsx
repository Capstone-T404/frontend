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

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <button onClick={test}>Click Me</button>
    </div>
  );
}

export default Test;
