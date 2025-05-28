import Timer from "./Timer.jsx";

export default function HomePage() {
    return (
        <main role="main">
            <Hero />
            <EventButton />
        </main>
    );
}

const Hero = () => (
    <section
        className="hero"
    // style={{ backgroundImage: `url(${hero})` }}
    >
        <div className="hero_content">
            <h1 className="hero_title">QLD Reds Event Tracker</h1>
            <Timer />
            <p className="hero_subtitle"></p>
        </div>
    </section>
);

const EventButton = () => (
    <section>
        <button onClick={buttonClicked()}>Click me</button>
        <button onClick={insertA()}>A</button>
        <button onClick={insertB()}>B</button>
        <button onClick={viewData()}>View Data</button>
        <div id="abc"></div>
        <button onClick={sendGameEvent()}>Send Game Event</button>
    </section>
);

function buttonClicked() {
    fetch('/buttonClicked', {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            document.getElementById('abc').innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

function insertA() {
    fetch('/events/insertA', {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            console.log(response);
            return response.json();
        })
        .then(data => { })
        .catch(error => {
            console.error('Error:', error);
        });
}
function insertB() {
    fetch('/events/insertB', {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            console.log(response);
            return response.json();
        })
        .then(data => { })
        .catch(error => {
            console.error('Error:', error);
        });
}
function viewData() {
    fetch('/events/viewData', {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            document.getElementById('abc').innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error :', error);
        });
}

function sendGameEvent() {
    fetch('/newGameEvent', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            time: 1,
            event: 'R',
            zone: 'A',
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            console.log(response);
            return response.json();
        })
        // .then(data => {
        //     console.log('data: ', data.message.gameTime);
        //     (document.getElementById('abc').innerHTML = data.message.gameTime),
        //         data.message.gameEvent,
        //         data.message.gameZone;
        // })
        .catch(error => {
            console.error('Error :', error);
        });
}
