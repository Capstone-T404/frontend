import Timer from "./Timer.jsx";

export default function HomePage() {
    return (
        <main role="main">
            <Hero />

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
