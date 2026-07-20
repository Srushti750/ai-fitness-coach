import { useEffect, useState } from "react";

import {
    getGoals,
    getGoalOptions,
    deleteGoal
} from "../services/goalServices";

import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import InfoCard from "../components/InfoCard";
import GoalForm from "../components/GoalForm";
import GoalCard from "../components/GoalCard";

import "../styles/GoalsPage.css";

function GoalsPage() {

    const [goals, setGoals] = useState([]);
    const [goalOptions, setGoalOptions] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState(null);

    // ===============================
    // Load Goals
    // ===============================
    const loadGoals = async () => {
        try {

            const response = await getGoals();

            if (response.success) {
                setGoals(response.data || []);
            }

        } catch (error) {
            console.error("Error loading goals:", error);
        }
    };

    // ===============================
    // Load Goal Options
    // ===============================
    const loadGoalOptions = async () => {
        try {

            const response = await getGoalOptions();

            if (response.success) {
                setGoalOptions(response.data);
            }

        } catch (error) {
            console.error("Error loading goal options:", error);
        }
    };

    // ===============================
    // Initialize Page
    // ===============================
    useEffect(() => {

        const initializePage = async () => {

            setLoading(true);

            await Promise.all([
                loadGoals(),
                loadGoalOptions()
            ]);

            setLoading(false);
        };

        initializePage();

    }, []);

    // ===============================
    // Refresh Goals
    // ===============================
    const refreshGoals = async () => {
        await loadGoals();
    };

    // ===============================
    // Add Goal
    // ===============================
    const handleAddGoal = () => {
        setSelectedGoal(null);
        setShowForm(true);
    };

    // ===============================
    // Edit Goal
    // ===============================
    const handleEditGoal = (goal) => {
        setSelectedGoal(goal);
        setShowForm(true);
    };

    // ===============================
    // Delete Goal
    // ===============================
    const handleDeleteGoal = async (goalId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this goal?"
        );

        if (!confirmDelete) return;

        try {

            const response = await deleteGoal(goalId);

            if (response.success) {
                await refreshGoals();
            }
            else {
                alert(response.message);
            }

        } catch (error) {
            console.error(error);
        }
    };

    // ===============================
    // Close Form
    // ===============================
    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedGoal(null);
    };

    // ===============================
    // Form Success
    // ===============================
    const handleFormSuccess = async () => {

        setShowForm(false);

        setSelectedGoal(null);

        await refreshGoals();
    };

    // ===============================
    // Loading
    // ===============================
    if (loading) {
        return <LoadingSpinner />;
    }

    // ===============================
    // Summary
    // ===============================
    const primaryGoal = goals.find(goal => goal.is_primary);

    const totalGoals = goals.length;

    // ===============================
    // UI
    // ===============================
    return (

        <div className="goals-page">

            <PageHeader
                title="My Goals"
                subtitle="Manage your fitness goals"
            />

            <InfoCard>

                <div className="goal-summary">

                    <div>

                        <strong>Primary Goal :</strong>{" "}

                        {primaryGoal
                            ? `${primaryGoal.title} ⭐`
                            : "None"}

                    </div>

                    <div>

                        <strong>Total Goals :</strong>{" "}

                        {totalGoals}

                    </div>

                </div>

            </InfoCard>

            <div className="goal-actions">

                <button
                    onClick={handleAddGoal}
                >
                    + Add Goal
                </button>

            </div>

            {
                showForm && (

                    <GoalForm
                        goal={selectedGoal}
                        goalOptions={goalOptions}
                        onSuccess={handleFormSuccess}
                        onCancel={handleCloseForm}
                    />

                )
            }

            <div className="goal-list">

                {
                    goals.length === 0 ? (

                        <InfoCard>

                            <p>No goals found.</p>

                        </InfoCard>

                    ) : (

                        goals.map(goal => (

                            <GoalCard
                                key={goal._id}
                                goal={goal}
                                onEdit={handleEditGoal}
                                onDelete={handleDeleteGoal}
                            />

                        ))

                    )
                }

            </div>

        </div>

    );
}

export default GoalsPage;