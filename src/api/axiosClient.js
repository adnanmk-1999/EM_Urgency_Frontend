import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ===== REQUEST INTERCEPTOR =====
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers["x-access-token"] = token; // ✅ backend expects this
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ===== RESPONSE INTERCEPTOR =====
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem("refreshToken")
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_BASEURL}/relogin`,
                    { refreshToken: localStorage.getItem("refreshToken") }
                );

                localStorage.setItem("accessToken", res.data.accessToken);

                axiosClient.defaults.headers["x-access-token"] =
                    res.data.accessToken;

                originalRequest.headers["x-access-token"] =
                    res.data.accessToken;

                return axiosClient(originalRequest);
            } catch {
                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
