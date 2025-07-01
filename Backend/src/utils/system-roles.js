export const SystemRoles = {
    ADMIN: "admin",
    USER: "user",
}


const { ADMIN, USER } = SystemRoles;
export const possibleRoles = {
    ADMIN: ADMIN,
    USER: USER,
    ADMIN_AND_USER: [ADMIN, USER],
}