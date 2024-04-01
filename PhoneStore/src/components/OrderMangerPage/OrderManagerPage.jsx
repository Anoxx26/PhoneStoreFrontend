import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

export default function OrderManagerPage(){

    const [orders, setOrders] = useState([])

    const [cookies] = useCookies(['token']);

    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7214/Order/GetProducts', config);
                const data = response.data;
                console.log(data)
                setOrders(data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [cookies]);

    return (
        <div style={{display: "flex", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Статус</th>
                    <th>Пользователь</th>
                    <th>Стоимость</th>
                    <th>Дата создания</th>
                    <th>Дата конца</th>
                </tr>
            </thead>
            <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.orderId}</td>
                            <td>{order.statusId}</td>
                            <td>{order.userId}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderCreate}</td>
                            <td>{order.orderEnd}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>
    )
}