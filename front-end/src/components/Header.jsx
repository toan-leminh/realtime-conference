import { Link } from "react-router-dom";

function Header() {
    // Logout
    const handleLogout = () => {
        localStorage.removeItem("username");
        window.location.href = "/";
    };

    return (
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                    <span className="fs-4">Realtime Conference</span>
                </Link>

                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/dashboard">
                        Dashboard
                    </Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/my-schedule">
                        My Schedule
                    </Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/active-session">
                        Active Sessions
                    </Link>
                </nav>

                {localStorage.getItem("username") && (
                    <div className="d-inline-flex.ms-md-3">
                        <span className="me-3 py-2 text-dark text-decoration-none">Hello, {localStorage.getItem("username")}!</span>
                        <Link className="me-3 py-2 text-dark text-decoration-none" onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}


export default Header;