import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';


export default function Dashboard() {

    ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
        }]
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category', // Uses CategoryScale
            },
            y: {
                type: 'linear', // Uses LinearScale
                beginAtZero: true,
            },
        },
    };

    return (
        <header role="banner">
            <div id="icon" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h1 style={{ fontSize: "1.5rem" }}>This is the Dashboard</h1>
            </div>
            <Line data={data} options={options} />
        </header>
    );
}
