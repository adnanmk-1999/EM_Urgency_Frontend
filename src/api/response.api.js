import axiosClient from "./axiosClient";

export const submitResponse = (data) =>
    axiosClient.post("/responses", data);
