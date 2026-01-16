import { useState, useEffect, useCallback } from "react";
import { getAllUsers, deleteUser } from "../services/admin.service";

export const useAdminUsers = (token) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllUsers(token);
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }, [token]);

    const removeUser = async(userId) => {
        if (!window.confirm('Opravdu chceš tohoto uživatele smazat?')) return;

        try {
            await deleteUser(userId, token);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch(err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        error,
        loading,
        removeUser,
    };

}