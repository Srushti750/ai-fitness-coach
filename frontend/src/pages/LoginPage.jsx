import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await loginUser(formData);
            

            if (response.success) {
                // localStorage.setItem(
                //     "access_token",
                //     response.access_token
                // );

                login(response.access_token);

                setMessage("Login successful");
            } else {
                setMessage(response.message);
            }

        } catch (error) {
            setMessage("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>{message}</p>

        </div>
    );
}

export default LoginPage;