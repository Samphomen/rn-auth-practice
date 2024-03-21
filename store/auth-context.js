import { createContext, useEffect } from "react";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV()

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: (token) => {}
});

function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState()

    function authenticate(token){
        setAuthToken(token)
        storage.set('token', token)
    }

    function logout(token){
        setAuthToken(null)
        storage.delete('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider