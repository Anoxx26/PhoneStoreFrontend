import { useCookies } from "react-cookie";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './ProfilePage.css'
import { Link } from 'react-router-dom'


export default function ProfilePage(){

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const {user, updateUser } = useUser();

    const [orders, setOrders] = useState([])
    
    const navigate = useNavigate();


    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7214/Order/GetOrderByUserId?userId=${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                setOrders(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Произошла ошибка при получении продукта:', error);
            }
        };

        fetchProduct();

    }, [cookies.token, user.id])


    const handleLogout = () => {
        alert("Вышел из аккаунта")
        updateUser(null)
        removeCookie('token', { path: '/' });
        navigate("/");
    };

    return (
        
        <div className="profileDiv">
            <div className="profileInfo">
                <label htmlFor="userName">Логин</label>
                <input id="userName" name="userName" readOnly value={user.username} type="text"/>
                <label htmlFor="email">Почта</label>
                <input id="email" readOnly value={user.email} name="email" type="text"/>
                <button onClick={handleLogout}>Выйти</button>
            </div>
            <div className="profileOrder">
                <h2>Мои заказы</h2>
                <div className="profileOrderDiv">
                    {
                        orders.map(order => (
                            <div className="pOrderDiv" key={order.orderId}>
                                <p>Заказ №{order.orderId}</p>
                                <p>Статус: {order.status.orderStatusName}</p>
                                <p>Стоимость: {order.totalPrice}</p>
                                <p>Дата создания заказа: {order.orderCreate}</p>
                                <p>Дата окончания заказа: {order.orderEnd}</p>
                                <Link to={`orderDetails/${order.orderId}`}>Подробнее</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        
    )
}