// It includes user profile form, handles user input

import { useEffect, useState } from "react";
import FormSection from "./FormSection";
import "../styles/ProfileForm.css";

function ProfileForm({ profile, options, onSave, message, saving }) {
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    fitness_level: "",
    activity_level: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // onSave(formData);

    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      alert("Full Name is required.");

      return false;
    }

    if (!formData.age) {
      alert("Age is required.");

      return false;
    }

    if (!formData.gender) {
      alert("Please select gender.");

      return false;
    }

    return true;
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      {message && <p>{message}</p>}

      <FormSection title="👤 Personal Information">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Age</label>

          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>

            {options?.gender?.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
      </FormSection>

      <FormSection title="📏 Body Measurements">
        <div>
          <label>Height (cm)</label>

          <input
            type="number"
            name="height_cm"
            value={formData.height_cm || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Weight (kg)</label>

          <input
            type="number"
            name="weight_kg"
            value={formData.weight_kg || ""}
            onChange={handleChange}
          />
        </div>
      </FormSection>

      <FormSection title="🏋️ Fitness Information">
        <div>
          <label>Fitness Level</label>

          <select
            name="fitness_level"
            value={formData.fitness_level || ""}
            onChange={handleChange}
          >
            <option value="">Select Fitness Level</option>

            {options?.fitness_level?.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Activity Level</label>

          <select
            name="activity_level"
            value={formData.activity_level || ""}
            onChange={handleChange}
          >
            <option value="">Select Activity Level</option>

            {options?.activity_level?.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </FormSection>

      <button type="submit">Save Profile</button>

      {/* <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Profile"}
      </button> */}
    </form>
  );
}

export default ProfileForm;
