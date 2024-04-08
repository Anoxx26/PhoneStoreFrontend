import { useCookies } from "react-cookie";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";


export default function ProfilePage(){

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const {user, updateUser } = useUser();
    
    const navigate = useNavigate();



    const handleLogout = () => {
        updateUser(null)
        removeCookie('token');
        navigate("/");
    };

    return (
        
        <div style={{display: "flex", flexDirection: "column", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <label htmlFor="userName">Логин</label>
            <input id="userName" name="userName" readOnly value={user.username} type="text"/>
            <label htmlFor="email">Почта</label>
            <input id="email" readOnly value={user.email} name="email" type="text"/>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}