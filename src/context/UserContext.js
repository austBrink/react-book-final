/**
 * Create context for user so all components can check signin status.
 */
import { createContext } from "react";

const initContext = {
    email: '',
    isAuthenticated: false,
};

const UserContext = createContext(initContext);
export default UserContext;
