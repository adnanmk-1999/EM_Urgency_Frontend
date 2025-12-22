import axiosClient from "./axiosClient";

export const login = (payload) =>
    axiosClient.post("/users/login", payload);

export const register = (payload) =>
    axiosClient.post("/auth/signup", payload);
