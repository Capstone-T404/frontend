// import "./Navigation.css"

function Navigation() {
    return (
        <div className="Nav">
            <nav className="Nav-header">

                <ul className="NavigationList">

                    <li className="NavTitle">
                        <h1>Red's data tracker</h1>
                    </li>
                    <li className="NavItem">
                        <a href="/" className="NavItem">Data Entry Page</a>
                    </li>
                    <li className="NavItem">
                        <a href="/Dashboard">Dashboard</a>
                    </li>
                    <li className="NavItem" >
                        <a href="/Login">Login page</a>
                    </li>
                    <li className="NavItem" >
                        <a href="/Register">Registration page</a>
                    </li>
                </ul>

            </nav>
        </div>
    );
}

export default Navigation;
