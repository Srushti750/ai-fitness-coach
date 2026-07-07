import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import {getProfile, getProfileOptions} from "../services/profileServices";

function ProfilePage() {

    const [profile, setProfile] = useState(null);
    const [profileOptions, setProfileOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const loadProfile = async () => {
        try {
            const profileResponse = await getProfile();
            const optionsResponse = await getProfileOptions();
            setProfile(profileResponse.data);
            setProfileOptions(optionsResponse.data);

            console.log("Profile Response:", profileResponse);
console.log("Options Response:", optionsResponse);
        } 
        catch (error) {
            console.error(error);
            setMessage("Failed to load profile.");

        } 
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadProfile();
    }, []);
    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <div>
            <h1>User Profile</h1>
            <pre>
                {JSON.stringify(profile, null, 2)}
            </pre>
        </div>
    );
}

export default ProfilePage;
