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

        goal_types: "",

        current_value: "",

        target_value: "",

        target_date: "",

        notes: "",

        status: "Active",

        is_primary: false

    });

    const [loading, setLoading] = useState(false);

    // ============================================
    // Populate form while editing
    // ============================================

    useEffect(() => {

        if (goal) {

            setFormData({

                title: goal.title || "",

                goal_types: goal.goal_types || "",

                current_value: goal.current_value ?? "",

                target_value: goal.target_value ?? "",

                target_date: goal.target_date || "",

                notes: goal.notes || "",

                status: goal.status || "Active",

                is_primary: goal.is_primary || false

            });

        }

    }, [goal]);

    // ============================================
    // Input Change
    // ============================================

    const handleChange = (event) => {

        const { name, value, type, checked } = event.target;

        setFormData(prev => ({

            ...prev,

            [name]: type === "checkbox"
                ? checked
                : value

        }));

    };

    // ============================================
    // Save Goal
    // ============================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formData.title.trim()) {
            alert("Title is required.");
            return;
        }

        if (!formData.goal_types) {
            alert("Please select a goal type.");
            return;
        }

        if (formData.current_value === "") {
            alert("Current value is required.");
            return;
        }

        if (formData.target_value === "") {
            alert("Target value is required.");
            return;
        }

        try {

            setLoading(true);

            let response;

            if (goal) {

                response = await updateGoal(
                    goal._id,
                    formData
                );

            }
            else {

                response = await createGoal(
                    formData
                );

            }

            if (response.success) {

                alert(response.message);

                onSuccess();

            }
            else {

                alert(response.message);

            }

        }
        catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="goal-form-container">

            <h2>

                {goal ? "Edit Goal" : "Add Goal"}

            </h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Title</label>

                    <input

                        type="text"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                    />

                </div>

                <div className="form-group">

                    <label>Goal Type</label>

                    <select

                        name="goal_types"

                        value={formData.goal_types}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select Goal Type

                        </option>

                        {

                            goalOptions?.goal_types?.map(type => (

                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>

                            ))

                        }

                    </select>

                </div>

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

                <div className="form-group">

                    <label>Target Date</label>

                    <input

                        type="date"

                        name="target_date"

                        value={formData.target_date}

                        onChange={handleChange}

                    />

                </div>

                <div className="form-group">

                    <label>Notes</label>

                    <textarea

                        rows="4"

                        name="notes"

                        value={formData.notes}

                        onChange={handleChange}

                    />

                </div>

                {
                    goal && (

                        <div className="form-group">

                            <label>Status</label>

                            <select

                                name="status"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                {

                                    goalOptions?.statuses?.map(status => (

                                        <option
                                            key={status}
                                            value={status}
                                        >
                                            {status}
                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                    )
                }

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

                <div className="form-buttons">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Saving..."
                                : goal
                                    ? "Update Goal"
                                    : "Create Goal"
                        }
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