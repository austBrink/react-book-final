import { createContext } from "react";

const initContext = {
    email: '',
    isAuthenticated: false,
};
const UserContext = createContext(initContext);
export default UserContext;
