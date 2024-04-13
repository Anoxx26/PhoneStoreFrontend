import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";

export default function OrderManagerPage(){

    const [orders, setOrders] = useState([])

    const [cookies] = useCookies(['token']);

    const [isEdit, setIsEdit] = useState(false)

    const [editId, setEditId] = useState(0)

    const [selectValue, setSelectValue] = useState(0)

    const [updateTrigger, setUpdateTrigger] = useState(false);

    

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
    }, [cookies, updateTrigger]);


    const UpdateOrder = async () => {
        try {
            const response = await axios.get(`https://localhost:7214/Order/UpdateOrderStatus?orderId=${editId}&statusId=${selectValue}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            setUpdateTrigger(prev => !prev);
            console.log(response.data);
            
          } catch (error) {
            console.error(error);
            
          }
    }

    const Edit = async (id, selectId) => {
        if (isEdit){
            UpdateOrder()
            setIsEdit(false)
            setEditId(0)
            setSelectValue(0)
        }
        else{
            setIsEdit(true)
            setEditId(id)
            setSelectValue(selectId)
            
        }
    }

    
const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

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
                    <th>Изменить</th>
                </tr>
            </thead>
            <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.orderId}</td>
                            <td>{isEdit !== false && order.orderId === editId ? (
                            <select value={selectValue} onChange={handleSelectChange}>
                                <option value={1}>В ожидании</option>
                                <option value={2}>Выполнено</option>
                            </select>
                            ) : (
                                order.status.orderStatusName
                            )}</td>
                            <td>{order.user.userName}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderCreate}</td>
                            <td>{order.orderEnd}</td>
                            <td>
                                <button onClick={() => Edit(order.orderId, order.statusId)}>Изменить</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div>
    )
}