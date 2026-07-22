import { useEffect, useState } from "react";

import {
    createGoal,
    updateGoal
} from "../services/goalServices";

import "../styles/GoalForm.css";

function GoalForm({
    goal,
    goalOptions,
    onSuccess,
    onCancel
}) {

    const [formData, setFormData] = useState({
        title: "",
        goal_type: "",
        current_value: "",
        target_value: "",
        target_date: "",
        notes: "",
        status: "Active",
        is_primary: false
    });

    const [loading, setLoading] = useState(false);

    // ============================================
    // Populate Form (Edit Mode)
    // ============================================

    useEffect(() => {

        if (goal) {

            setFormData({
                title: goal.title || "",
                goal_type: goal.goal_type || "",
                current_value: goal.current_value ?? "",
                target_value: goal.target_value ?? "",
                target_date: goal.target_date
                    ? goal.target_date.split("T")[0]
                    : "",
                notes: goal.notes || "",
                status: goal.status || "Active",
                is_primary: goal.is_primary || false
            });

        } else {

            setFormData({
                title: "",
                goal_type: "",
                current_value: "",
                target_value: "",
                target_date: "",
                notes: "",
                status: "Active",
                is_primary: false
            });

        }

    }, [goal]);

    // ============================================
    // Handle Input Change
    // ============================================

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    // ============================================
    // Handle Submit
    // ============================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formData.title.trim()) {
            alert("Title is required.");
            return;
        }

        if (!formData.goal_type) {
            alert("Please select a Goal Type.");
            return;
        }

        if (formData.current_value === "") {
            alert("Current Value is required.");
            return;
        }

        if (formData.target_value === "") {
            alert("Target Value is required.");
            return;
        }

        const payload = {
            title: formData.title.trim(),
            goal_type: formData.goal_type,
            current_value: Number(formData.current_value),
            target_value: Number(formData.target_value),
            target_date: formData.target_date || null,
            notes: formData.notes.trim(),
            is_primary: formData.is_primary
        };

        // Status should only be sent while updating
        if (goal) {
            payload.status = formData.status;
        }

        console.log("Payload:", payload);

        try {

            setLoading(true);

            let response;

            if (goal) {

                response = await updateGoal(
                    goal._id,
                    payload
                );

            } else {

                response = await createGoal(
                    payload
                );

            }

            if (response.success) {

                alert(response.message);

                onSuccess();

            } else {

                alert(response.message);

            }

        } catch (error) {

            console.error("Goal Error:", error);

            if (error.response) {
                console.log("Backend Response:", error.response.data);
            }

            alert("Something went wrong.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="goal-form-container">

            <h2>
                {goal ? "Edit Goal" : "Create Goal"}
            </h2>

            <form onSubmit={handleSubmit}>

                {/* Title */}

                <div className="form-group">

                    <label>Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                </div>

                {/* Goal Type */}

                <div className="form-group">

                    <label>Goal Type</label>

                    <select
                        name="goal_type"
                        value={formData.goal_type}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Goal Type
                        </option>

                        {goalOptions?.goal_type?.map((type) => (

                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>

                        ))}

                    </select>

                </div>

                {/* Current Value */}

                <div className="form-group">

                    <label>Current Value</label>

                    <input
                        type="number"
                        step="0.01"
                        name="current_value"
                        value={formData.current_value}
                        onChange={handleChange}
                    />

                </div>

                {/* Target Value */}

                <div className="form-group">

                    <label>Target Value</label>

                    <input
                        type="number"
                        step="0.01"
                        name="target_value"
                        value={formData.target_value}
                        onChange={handleChange}
                    />

                </div>

                {/* Target Date */}

                <div className="form-group">

                    <label>Target Date</label>

                    <input
                        type="date"
                        name="target_date"
                        value={formData.target_date}
                        onChange={handleChange}
                    />

                </div>

                {/* Notes */}

                <div className="form-group">

                    <label>Notes</label>

                    <textarea
                        rows="4"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                </div>

                {/* Status (Only in Edit Mode) */}

                {goal && (

                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            {goalOptions?.statuses?.map((status) => (

                                <option
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>

                            ))}

                        </select>

                    </div>

                )}

                {/* Primary Goal */}

                <div className="checkbox-group">

                    <label>

                        <input
                            type="checkbox"
                            name="is_primary"
                            checked={formData.is_primary}
                            onChange={handleChange}
                        />

                        Make this my Primary Goal

                    </label>

                </div>

                {/* Buttons */}

                <div className="form-buttons">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : goal
                                ? "Update Goal"
                                : "Create Goal"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default GoalForm;