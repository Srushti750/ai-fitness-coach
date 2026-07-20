
// Goal Metadata

export const GOAL_METADATA = {

    Weight: {
        unit: "kg",
        direction: "decrease"
    },

    Distance: {
        unit: "km",
        direction: "increase"
    },

    "Workout Days": {
        unit: "days",
        direction: "increase"
    },

    "Calories Burned": {
        unit: "kcal",
        direction: "increase"
    },

    "Water Intake": {
        unit: "L",
        direction: "increase"
    },

    "Sleep Duration": {
        unit: "hrs",
        direction: "increase"
    }

};

// Goal Unit

export const getGoalUnit = (goalType) => {

    return GOAL_METADATA[goalType]?.unit || "";

};

// Goal Progress

export const calculateGoalProgress = (goal) => {

    const current = Number(goal.current_value);

    const target = Number(goal.target_value);

    if (target <= 0) {

        return 0;

    }

    const metadata = GOAL_METADATA[goal.goal_type];

    if (!metadata) {

        return 0;

    }

    if (metadata.direction === "increase") {

        return Math.min(
            (current / target) * 100,
            100
        );

    }

    return Math.min(
        (target / current) * 100,
        100
    );

};

// Date Formatter

export const formatGoalDate = (date) => {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleDateString();

};

// Status Badge Color

export const getStatusColor = (status) => {

    const colors = {

        Active: "#0d6efd",

        Completed: "#198754",

        Paused: "#ffc107",

        Cancelled: "#dc3545"

    };

    return colors[status] || "#6c757d";

};
