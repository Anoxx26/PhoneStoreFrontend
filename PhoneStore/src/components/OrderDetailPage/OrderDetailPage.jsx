import { useEffect, useState } from "react"
import "./OrderDetailPage.css"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie"


export default function OrderDetailPage(){

    const [orderDetail, setOrderDetail] = useState([])

    const [cookies] = useCookies(['token']);

    const { id } = useParams();

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(()=> {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7214/Order/GetOrderDetailById?orderId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                setOrderDetail(response.data)
                console.log(response.data)

                let total = 0;
                for (const item of response.data) {
                    total += item.product.price * item.quantity;
                }
                setTotalPrice(total);

                
            } catch (error) {
                console.error('Произошла ошибка при получении продукта:', error);
            }
        };

        fetchProduct();

        

    }, [cookies.token, id])



    return (
        <div className="orderDetailPage">
            <h2>Детали заказа №{id}</h2>
            <h3>Полная стоимость - {totalPrice}</h3>
            {
                orderDetail.map(order => (
                    <div className="orderDetailDiv" key={order.productId}>
                        <div className='productImgDiv'>
                        <img src={order.product.imagePath} alt={order.product.model}/>
                    </div>
                    <div className='prductInfoDiv'>
                        <p>{order.product.brand} {order.product.model}</p>
                        <p>Кол-во: <b>{order.quantity}</b></p>
                        <p>Стоимость: <b>{order.quantity * order.product.price}</b></p>
                        
                    </div>
                    </div>
                ))
            }
        </div>
    )
}