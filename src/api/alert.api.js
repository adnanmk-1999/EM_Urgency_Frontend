import axiosClient from "./axiosClient";

export const getAlerts = () =>
    axiosClient.get("/alerts");

export const fetchAdminAlerts = () =>
    axiosClient.get("/admin/alert");

export const createAlert = (data) =>
    axiosClient.post("/admin/alert", data);

export const updateAlert = (id, data) =>
    axiosClient.put(`/admin/alert/${id}`, data);

export const deleteAlert = (id) =>
    axiosClient.delete(`/admin/alert/${id}`);
