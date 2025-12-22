const getRoles = () =>
    (localStorage.getItem("roles") || "")
        .split(",")
        .map(r => r.trim())
        .filter(Boolean);

const hasRole = (role) => {
    if (!localStorage.getItem("accessToken")) return false;
    return getRoles().includes(role);
};

const roleController = {
    isAdmin: () => hasRole("Role:ADMIN"),
    isUser: () => hasRole("Role:USER") || hasRole("Role:ADMIN"),
};

export default roleController;