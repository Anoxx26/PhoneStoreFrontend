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
            <h3>Полная стоимость - {totalPrice}</h3>
            <div className='productsDiv'>
                {cartState.items.map(item => (
                <div key={item.id} className='productDiv'>
                    <div className='productImgDiv'>
                        <img src={item.imagePath} alt={item.model}/>
                    </div>
                    <div className='prductInfoDiv'>
                        <p>{item.brand} {item.model}</p>
                        <p>Кол-во: <b>{item.quantity}</b></p>
                        <p>Стоимость: <b>{item.quantity * item.price}</b></p>
                        <div className='productButtonDiv'>
                            <button onClick={() => addToCart(item)}>+</button>
                            <button onClick={() => removeToCart(item)}>–</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            
            

            {user && user.id ? <button onClick={makeOrder}>Сделать заказ</button> : <p>Для покупки нужно авторизоваться!</p>}
            
            
        </div>
    )
}