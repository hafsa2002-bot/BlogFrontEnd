import axios from "axios";

export const getCurrentUser = async () => {
    try {
        const res = await axios.get("/api/users/me"); // Your backend route
        return res.data; // The user object without password
    } catch (err) {
        console.error("Error fetching current user:", err);
        return null;
    }
};