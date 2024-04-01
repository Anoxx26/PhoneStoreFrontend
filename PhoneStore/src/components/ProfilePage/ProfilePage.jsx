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
        
        <div style={{display: "flex", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}