import axios from "axios";
import { useEffect, useState } from "react";
import ProductPreview from "../ProductPreview/ProductPreview";
import './CatalogPage.css'


export default function CatalogPage(){
    const [phones, setPhones] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }
    
    const filteredPhones = phones.filter(phone =>
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.model.toLowerCase().includes(searchQuery.toLowerCase())
    )
       

    return (
        <div>
            <input className="searchInput" type="text" placeholder="Введите название" value={searchQuery} onChange={handleSearchChange} />

            <div className="catalogPage-div">
            
            {
                filteredPhones.map(phone => (
                    <ProductPreview key={phone.phoneId} phone={phone}/>
                ))
            }
            
        </div>
        </div>
        
    )
}