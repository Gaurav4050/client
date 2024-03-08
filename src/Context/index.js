import { createContext, useEffect, useState } from "react";

const defaultProvider = {
    user: "",
    setUser: () => {},
    login: () => {},
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (userData) {
          setUser(JSON.parse(userData))
        }
      }, [])

    const handleLogin = (params, errorCallback) => {
        // LoginApi(params)
        //   .then(async res => {
        //     setUser(res.data)
        //     localStorage.setItem('userData', JSON.stringify(res.data))
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        setUser("rajast")
        
      }

      const value = {
        user,
        setUser,
        login: handleLogin,
      };
    

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };