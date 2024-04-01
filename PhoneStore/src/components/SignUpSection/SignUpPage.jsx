import Button from "../Button/Button"
import './SignUpPage.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(){

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    email: ''
  });
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://localhost:7214/User/SignUp', formData);
          console.log(response.data);
          if (response){
            navigate("/")
          }

        } catch (error) {
          console.error(error);
        }
      }

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    
    return(
        <section className="signUpSection">
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Логин</label>
                <input id="userName" name="userName" type="text" value={formData.userName} onChange={handleChange}/>
                <label htmlFor="password">Пароль</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}/>
                <label htmlFor="email">Почта</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}/>

                <Button>Зарегистрировать</Button>
            </form>
        </section>
    )
}