import { useState } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";

export default function ProductAddPage(){

    const [cookies] = useCookies(['token']);

    const [product, setProduct] = useState({
        price: '',
        description: '',
        brand: '',
        model: '',
        releaseDate: '',
        displaySize: '',
        operatingSystem: '',
        processor: '',
        ramMemory: '',
        memory: '',
        cameraPx: '',
        batteryCapacity: '',
        color: '',
        imagePath: ''
    });

    

    const addProduct = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        };

        console.log(cookies.token)
        try {
            console.log(product)
            const response = await axios.post('https://localhost:7214/Product/AddProduct', product, config)
            console.log(response.data); 
        } catch (error) {
            console.error('Произошла ошибка при отправке запроса:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct()
    };

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems : "center", justifyContent: "center", height: "100%"}}>
            <h2>Добавить продукт</h2>
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
                    <input type="text" name="brand" value={product.rband} onChange={handleChange} />
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
                <button type="submit">Добавить</button>
            </form>
        </div>
    )
}