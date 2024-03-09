import { createContext, useEffect, useState } from "react";

const defaultProvider = {
    user: "",
    setUser: () => {},
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initAuth = () => {
            const userData = localStorage.getItem('userData')
        console.log(userData)
        if (userData) {
            const paramseData = JSON.parse(userData)
            console.log(paramseData)
          setUser(paramseData)
        }
        setIsInitialized(true)
        }

        
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


      console.log("user", user)
    const handleLogin = (data) => {
        console.log(data)
        localStorage.setItem('userData', JSON.stringify(data))
        setUser(data)
        
      }

      const handleLogout = () => {
        localStorage.removeItem('userData')
        setUser(null)
      }

      const value = {
        user: user,
        setUser,
        login: handleLogin,
        logout: handleLogout,
      };
    

    return (
        <AuthContext.Provider value={value}>
             {isInitialized && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };