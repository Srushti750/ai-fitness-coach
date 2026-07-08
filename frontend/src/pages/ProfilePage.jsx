import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileForm from "../components/ProfileForm";
import {
  getProfile,
  getProfileOptions,
  updateProfile,
} from "../services/profileServices";
import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [profileOptions, setProfileOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Loads profile and options
  const loadProfile = async () => {
    try {
      const [profileResponse, optionsResponse] = await Promise.all([
        getProfile(),
        getProfileOptions(),
      ]);

      console.log("Profile Response:", profileResponse);
      console.log("Options Response:", optionsResponse);

      if (profileResponse.success) {
        setProfile(profileResponse.data);
      }

      if (optionsResponse.success) {
        setProfileOptions(optionsResponse.data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);

      setMessage("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // For profile update
  const handleSave = async (updatedProfile) => {
    try {
    //   setLoading(true);
      setSaving(true);

      const response = await updateProfile(updatedProfile);

      if (response.success) {
        setProfile(response.data);

        setMessage(response.message);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile-page">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information."
      />
      <ProfileForm
        profile={profile}
        options={profileOptions}
        onSave={handleSave}
        message={message}
        saving={saving}
      />

      <InfoCard title="Complete Your Profile">
        <p>Complete your profile to unlock AI-powered features:</p>
        <ul>
          <li>AI Personal Fitness Coach</li>
          <li>AI Nutrition Recommendation</li>
          <li>Workout Anomaly Detection</li>
          <li>Burnout & Injury Prediction</li>
        </ul>
      </InfoCard>
    </div>
  );
}

export default ProfilePage;

// import { useEffect, useState } from "react";
// import LoadingSpinner from "../components/LoadingSpinner";
// import {getProfile, getProfileOptions} from "../services/profileServices";
// import ProfileForm from "../components/ProfileForm";

// function ProfilePage() {

//     const [profile, setProfile] = useState(null);
//     const [profileOptions, setProfileOptions] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");

//     const loadProfile = async () => {
//         try {
//             const profileResponse = await getProfile();
//             const optionsResponse = await getProfileOptions();
//             setProfile(profileResponse.data);
//             setProfileOptions(optionsResponse.data);

//             console.log("Profile Response:", profileResponse);
// console.log("Options Response:", optionsResponse);
//         }
//         catch (error) {
//             console.error(error);
//             setMessage("Failed to load profile.");

//         }
//         finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         loadProfile();
//     }, []);
//     if (loading) {
//         return <LoadingSpinner />;
//     }
//     return (
//         <div>
//             <h1>User Profile</h1>
//             <pre>
//                 {JSON.stringify(profile, null, 2)}
//             </pre>
//         </div>
//     );
// }

// export default ProfilePage;
