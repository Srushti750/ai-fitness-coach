import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";

function DashboardPage() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <PageHeader
                title="Dashboard"
                subtitle="Monitor your daily fitness progress."
            />

            <h3>Welcome {user?.username}</h3>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default DashboardPage;