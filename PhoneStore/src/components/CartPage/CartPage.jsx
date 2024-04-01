import { useState } from 'react';
import { useCart } from '../CartContext';
import { useEffect } from 'react';
import { useUser } from '../UserContext';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './CartPage.css'

export default function CartPage(){

    const [cookies] = useCookies(['token']);

    const { cartState , dispatch } = useCart();

    const { user } = useUser();

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        
        setTotalPrice((total) => {
            total = 0
            for(const item of cartState.items){
                total += item.price * item.quantity
            }
            return total
        });
        
    }, [cartState]);
    

    const addToCart = (phone) => {
        dispatch({ type: 'ADD_TO_CART', payload: phone });
        if (cartState.items.length > 0) {
            console.log(cartState.items[0].quantity);
        }
      };

      const removeToCart = (phone) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: phone });
        if (cartState.items.length > 0) {
            console.log(cartState.items[0].quantity);
        }
      };

    const makeOrder = async () => {

        const details = cartState.items.map(item => {
            return { ProductId: item.phoneID, Quantity: item.quantity };
        });

        console.log(details)

        const orderData = {
            StatusId: 1,
            UserId: user.id,
            TotalPrice: totalPrice,
            OrderDetails: details
        };

        console.log(orderData)

        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        };

        try {
            const response = await axios.post('https://localhost:7214/Order/AddOrder', orderData, config);
            console.log(response.data);
            if (response.data != "False"){
              console.log("Вышло")
              dispatch({type: 'CLEAR_CART'})
            }
            else{
              console.log("Не вышло брат")
            }
            
          } catch (error) {
            console.error(error);
            console.log("Не вышло")
          }
    }

    return (
        <div className='cartpage-div'>
            <h1>Корзина</h1>

            <table>
                <tr>
                    <th>Имя</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    <th>Действия</th>
                </tr>
                {cartState.items.map(item => (
                    <tr key={item.id}>
                        <td>{item.brand} {item.model}</td>
                        <td>{item.quantity}</td>
                        <td>{item.quantity * item.price}</td>
                        <td>
                            <button onClick={() => addToCart(item)}>+</button>
                            <button onClick={() => removeToCart(item)}>-</button>
                            
                        </td>
                    </tr>
                ))}
            </table>
            <h3>Полная стоимость - {totalPrice}</h3>

            {user && user.id ? <button onClick={makeOrder}>Сделать заказ</button> : null}
            
            
        </div>
    )
}