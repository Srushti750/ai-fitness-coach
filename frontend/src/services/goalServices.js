import api from "./api";

const GOAL_URL = "/goals";

// Get All Goals
export const getGoals = async () => {
    const response = await api.get(GOAL_URL);
    return response.data;
};

// Get Goal By Id
export const getGoal = async (goalId) => {
    const response = await api.get(`${GOAL_URL}/${goalId}`);
    return response.data;
};

// Create Goal
export const createGoal = async (goalData) => {
    const response = await api.post(GOAL_URL, goalData);
    return response.data;
};

// Update Goal
export const updateGoal = async (goalId, goalData) => {
    const response = await api.put(`${GOAL_URL}/${goalId}`, goalData);
    return response.data;
};

// Delete Goal
export const deleteGoal = async (goalId) => {
    const response = await api.delete(`${GOAL_URL}/${goalId}`);
    return response.data;
};

// Goal Options
export const getGoalOptions = async () => {
    const response = await api.get(`${GOAL_URL}/options`);
    return response.data;
};