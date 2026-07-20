import "../styles/GoalsCard.css";

import {
    getGoalUnit,
    calculateGoalProgress,
    formatGoalDate,
    getStatusColor
} from "../utils/goalUtils";

function GoalCard({ goal, onEdit, onDelete }) {

    const unit = getGoalUnit(goal.goal_type);

    const progress = calculateGoalProgress(goal);

    const formattedDate = formatGoalDate(goal.target_date);

    const statusColor = getStatusColor(goal.status);

    const handleDelete = () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this goal?"
        );

        if (confirmDelete) {
            onDelete(goal._id);
        }
    };

    return (

        <div className="goal-card">

            {/* Header */}

            <div className="goal-card-header">

                <div>

                    <h3>

                        {goal.title}

                        {
                            goal.is_primary && (
                                <span className="primary-badge">
                                    ⭐ Primary
                                </span>
                            )
                        }

                    </h3>

                    <p className="goal-type">
                        {goal.goal_type}
                    </p>

                </div>

                <span
                    className="status-badge"
                    style={{
                        backgroundColor: statusColor
                    }}
                >
                    {goal.status}
                </span>

            </div>

            {/* Goal Details */}

            <div className="goal-details">

                <div className="goal-detail-item">

                    <strong>Current</strong>

                    <p>

                        {goal.current_value} {unit}

                    </p>

                </div>

                <div className="goal-detail-item">

                    <strong>Target</strong>

                    <p>

                        {goal.target_value} {unit}

                    </p>

                </div>

            </div>

            {/* Progress */}

            <div className="goal-progress">

                <div className="progress-header">

                    <span>Progress</span>

                    <span>{progress.toFixed(1)}%</span>

                </div>

                <div className="progress-container">

                    <div
                        className="progress-bar"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

            </div>

            {/* Target Date */}

            <div className="goal-date">

                <strong>Target Date:</strong>{" "}

                {formattedDate}

            </div>

            {/* Notes */}

            <div className="goal-notes">

                <strong>Notes</strong>

                <p>

                    {
                        goal.notes
                            ? goal.notes
                            : "No notes added."
                    }

                </p>

            </div>

            {/* Footer */}

            <div className="goal-card-footer">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(goal)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default GoalCard;