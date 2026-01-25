import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { AuthState, LoginPayload } from "../types/auth";
import { api } from "../api/axios";

interface AuthContextType extends AuthState {
    login: (payload: LoginPayload) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "atlaslogix_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return {
                token: null,
                tenantId: null,
                role: null,
                userId: null,
            };
        }

        try {
            return JSON.parse(stored);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            return {
                token: null,
                tenantId: null,
                role: null,
                userId: null,
            };
        }
    });

    const login = async ({ email, password }: LoginPayload) => {
        const { data } = await api.post("auth/login", { email, password, });

        const newAuth: AuthState = {
            token: data.token,
            tenantId: data.tenantId,
            role: data.role,
            userId: data.userId,
        };

        setAuth(newAuth);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuth));
    };

    const logout = () => {
        setAuth({
            token: null,
            tenantId: null,
            role: null,
            userId: null,
        });
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                login,
                logout,
                isAuthenticated: !!auth.token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used inside AuthProvider");
    }
    return ctx;
};
