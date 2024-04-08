import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useCart } from '../CartContext';
import './ProductPage.css'

export default function ProductPage(){

    const [product, setProduct] = useState({})

    const { id } = useParams();

    const [cookies] = useCookies(['token']);

    const { cartState , dispatch } = useCart();

    const addToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        if (cartState.items.length > 0) {
            console.log(cartState.items[0].quantity);
        }
      };

    useEffect(()=> {
        console.log(id)
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7214/Product/GetProductById?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                setProduct(response.data)
            } catch (error) {
                console.error('Произошла ошибка при получении продукта:', error);
            }
        };

        fetchProduct();

    }, [cookies.token, id])

    return (
        <div className="product-page-div">
            <div className='product-page-div-mini'>
                <img src={product.imagePath}/>
                <button onClick={addToCart} style={{marginLeft: "25px", marginRight: "25px", marginTop: "10px"}}>В корзину</button>
            </div>
            <div className='product-page-div-mini'>
                <h3>Характеристики:</h3>
            <ul>
                <li>
                Название: 
                    <p>{product.brand} {product.model}</p>
                </li>
        <li>Цена: <p>{product.price} рублей</p></li>
        <li>
          Описание: <p className='p-product'>{product.description}</p>
        </li>
        <li>
          Бренд: <p className='p-product'>{product.brand}</p>
        </li>
        <li>
          Модель: <p className='p-product'>{product.model}</p>
        </li>
        <li>
    Дата выхода: <p className='p-product'>{product.releaseDate}</p>
</li>
<li>
    Размер дисплея: <p className='p-product'>{product.displaySize}</p>
</li>
<li>
    Операционная система: <p className='p-product'>{product.operatingSystem}</p>
</li>
<li>
    Процессор: <p className='p-product'>{product.processor}</p>
</li>
<li>
    Оперативная память: <p className='p-product'>{product.ramMemory}</p>
</li>
<li>
    Память: <p className='p-product'>{product.memory}</p>
</li>
<li>
    Камера Px: <p className='p-product'>{product.cameraPx}</p>
</li>
<li>
    Емкость батареи: <p className='p-product'>{product.batteryCapacity}</p>
</li>
<li>
    Цвет: <p className='p-product'>{product.color}</p>
</li>
      </ul>
            </div>
            
        </div>
    )
}