import { useState } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

export default function ProductUpdatePage(){


    const [cookies] = useCookies(['token']);

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        phoneID: 0,
        price: 0,
        description: '',
        brand: '',
        model: '',
        releaseDate: 0,
        displaySize: 0,
        operatingSystem: '',
        processor: '',
        ramMemory: 0,
        memory: 0,
        cameraPx: 0,
        batteryCapacity: 0,
        color: '',
        imagePath: ''
    });

    const { id } = useParams();

    console.log(id)

    const updateProduct = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        };

        console.log(cookies.token)
        try {
            console.log(product)
            const response = await axios.post('https://localhost:7214/Product/UpdateProduct', product, config)
            console.log(response.data); 
            navigate("/")

        } catch (error) {
            console.error('Произошла ошибка при отправке запроса:', error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://localhost:7214/Product/GetProductById?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                const { data } = response;
        const adaptedProduct = {
            phoneID: data.phoneID,
            price: data.price,
            description: data.description,
            brand: data.brand,
            model: data.model,
            releaseDate: data.releaseDate,
            displaySize: data.displaySize,
            operatingSystem: data.operatingSystem,
            processor: data.processor,
            ramMemory: data.ramMemory,
            memory: data.memory,
            cameraPx: data.cameraPx,
            batteryCapacity: data.batteryCapacity,
            color: data.color,
            imagePath: data.imagePath
        };

            setProduct(adaptedProduct);
            } catch (error) {
                console.error('Произошла ошибка при получении продукта:', error);
            }
        };

        fetchProduct();
    }, [id, cookies.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct()
    };

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <h2>Обновить продукт</h2>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems : "start", justifyContent: "center", height: "100%"}}>
                <label>
                    Модель:
                    <input type="text" name="model" value={product.model} onChange={handleChange} />
                </label>
                <label>
                    Цена:
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                </label>
                <label>
                    Описание:
                    <input type="text" name="description" value={product.description} onChange={handleChange} />
                </label>
                <label>
                    Бренд:
                    <input type="text" name="brand" value={product.brand} onChange={handleChange} />
                </label>
                <label>
                    Дата выпуска:
                    <input type="text" name="releaseDate" value={product.releaseDate} onChange={handleChange} />
                </label>
                <label>
                    Размер дисплея:
                    <input type="number" name="displaySize" value={product.displaySize} onChange={handleChange} />
                </label>
                <label>
                        Операционная система:
                        <input type="text" name="operatingSystem" value={product.operatingSystem} onChange={handleChange} />
                </label>
                <label>
                        Процессор:
                        <input type="text" name="processor" value={product.processor} onChange={handleChange} />
                </label>
                <label>
                        Объем оперативной памяти:
                        <input type="number" name="ramMemory" value={product.ramMemory} onChange={handleChange} />
                </label>
                <label>
                        Объем памяти:
                        <input type="number" name="memory" value={product.memory} onChange={handleChange} />
                </label>
                <label>
                        Разрешение камеры:
                        <input type="number" name="cameraPx" value={product.cameraPx} onChange={handleChange} />
                </label>
                <label>
                        Емкость батареи:
                        <input type="number" name="batteryCapacity" value={product.batteryCapacity} onChange={handleChange} />
                </label>
                <label>
                    Цвет:
                    <input type="text" name="color" value={product.color} onChange={handleChange} />
                </label>
                <label>
                        Ссылка на картинку:
                        <input type="text" name="imagePath" value={product.imagePath} onChange={handleChange} />
                </label>
                <button type="submit">Изменить</button>
            </form>
        </div>
    )
}