// import '/testPage.css';

export default function testPage(){
    return (
        <main className="min-h-screen grid place-items-center p-8">
      <button
        type="button"
        onClick={() => alert('Clicked!')}
        className="rounded-2xl px-5 py-3 text-sm font-medium shadow"
      >
        Click me
      </button>
    </main>
    )
}