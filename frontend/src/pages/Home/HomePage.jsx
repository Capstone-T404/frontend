import Timer from "../../components/UI/Timer/Timer";
import './HomePage.css';

export default function HomePage() {
    const Hero = () => (
        <section className="hero"
            // style={{ backgroundImage: `url(${hero})` }}
        >
            <div className="hero_content">
                <h1 className="hero_title">QLD Reds Event Tracker</h1>
                <div className="timer_container">
                    <Timer /> 
                </div>
                <p className="hero_subtitle"></p>
            </div>
        </section>
    );
    
    return (
        <main role="main">
            <Hero />
            {/*<EventButton />*/}
        </main>
    );
}



// function EventButton() {
//
//     function buttonClicked() {
//         fetch('https://api.bneitconsulting.com/buttonClicked', {
//             method: 'POST',
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error');
//                 }
//                 console.log(response);
//                 return response.json();
//             })
//             .then(data => {
//                 document.getElementById('abc').innerHTML = data.message;
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     };
//
//     function insertA() {
//         fetch('https://api.bneitconsulting.com/events/insertA', {
//             method: 'POST',
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error');
//                 }
//                 console.log(response);
//                 return response.json();
//             })
//             .then(data => { })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }
//
//     function insertB() {
//         fetch('https://api.bneitconsulting.com/events/insertB', {
//             method: 'POST',
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error');
//                 }
//                 console.log(response);
//                 return response.json();
//             })
//             .then(data => { })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }
//
//     function viewData() {
//         fetch('https://api.bneitconsulting.com/events/viewData', {
//             method: 'GET',
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error');
//                 }
//                 console.log(response);
//                 return response.json();
//             })
//             .then(data => {
//                 let receivedData;
//                 for (let index = 0; index < data.message.length; index++) {
//                     receivedData += JSON.stringify(data.message[index]);
//                 }
//                 document.getElementById('abc').innerHTML = receivedData;
//             })
//             .catch(error => {
//                 console.error('Error :', error);
//             });
//     }

    // function sendGameEvent() {
    //     fetch('https://api.bneitconsulting.com/events/newGameEvent', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             time: 1,
    //             event: 'R',
    //             zone: 'A',
    //         }),
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Error');
    //             }
    //             console.log(response);
    //             return response.json();
    //         })
    //         // .then(data => {
    //         //     console.log('data: ', data.message.gameTime);
    //         //     (document.getElementById('abc').innerHTML = data.message.gameTime),
    //         //         data.message.gameEvent,
    //         //         data.message.gameZone;
    //         // })
    //         .catch(error => {
    //             console.error('Error :', error);
    //         });
    // }
    // return (
    //     <section>
    //         <button onClick={buttonClicked}>Click me</button>
    //         <button onClick={insertA}>A</button>
    //         <button onClick={insertB}>B</button>
    //         <button onClick={viewData}>View Data</button>
    //         <div id="abc"></div>
    //         <button onClick={sendGameEvent}>Send Game Event</button>
    //     </section >
    // );
// }

