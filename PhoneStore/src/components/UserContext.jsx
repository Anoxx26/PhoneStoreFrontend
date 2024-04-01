// Создание контекста для хранения переменной из JWT токена
import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { decodeToken } from 'react-jwt';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(['token']);

    const updateUser = (userData) => {
        setUser(userData);
    };

    useEffect(() => {
        const token = cookies['token'];

        if (token) {
            try {
                const decodedToken = decodeToken(token);
                const user = {
                    username: decodedToken.unique_name,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    id: decodedToken.userId
                    // Добавьте другие поля из токена по необходимости
                };
                updateUser(user);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [cookies]);


    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
