import { Link } from "react-router-dom";
import { callApi } from "../services/api";

function Header() {
    // Logout
    const handleLogout = () => {
        try{
            callApi('/logout');

            localStorage.removeItem("username");
            localStorage.removeItem("avatar");
            
            window.location.href = "/";
        }catch(ex){
            console.log("Error occured: ", ex);
        }
    };

    return (
        <header>
            <div className="d-flex flex-column flex-md-row align-items-center pb-3 pt-3 mb-4 border-bottom">
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
                    <div className="d-inline-flex ms-md-3">
                        {localStorage.getItem("avatar") && (
                            <img
                                src={localStorage.getItem("avatar")}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start shadow-1-strong ms-3"
                                width="40"
                            />
                        )}
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