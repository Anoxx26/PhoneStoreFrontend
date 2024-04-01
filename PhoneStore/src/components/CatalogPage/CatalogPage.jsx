import axios from "axios";
import { useEffect, useState } from "react";
import ProductPreview from "../ProductPreview/ProductPreview";
import './CatalogPage.css'


export default function CatalogPage(){
    const [phones, setPhones] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7214/Product/GetProducts');
                const data = response.data;
                setPhones(data);
            } catch (error) {
                console.error('Произошла ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="catalogPage-div">
            {
                phones.map(phone => (
                    <ProductPreview key={phone.phoneId} phone={phone}/>
                ))
            }
            
        </div>
    )
}