import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { Link } from 'react-router-dom'

export default function ProductManagerPage(){

    
    const [products, setProducts] = useState([])

    const [cookies] = useCookies(['token']);

    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7214/Product/GetProducts', config);
                const data = response.data;
                console.log(data)
                setProducts(data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [cookies]);


    const handleDeleteProduct = async (productId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            };
            console.log(productId)
            await axios.delete(`https://localhost:7214/Product/DeleteProduct?phoneID=${productId}`, config);
            setProducts(products.filter(product => product.phoneID !== productId));
        } catch (error) {
            console.error('Произошла ошибка при удалении продукта:', error);
        }
        
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <table>
            <thead>
                <tr>
                    <th>Модель</th>
                    <th>Бренд</th>
                    <th>Цена</th>
                    <th>Удалить</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.phoneID}>
                        <td>{product.model}</td>
                        <td>{product.brand}</td>
                        <td>{product.price}</td>
                        <td>
                            <button onClick={() => handleDeleteProduct(product.phoneID)}>X</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to={'add'}>Добавить</Link>
        </div>
    )
}