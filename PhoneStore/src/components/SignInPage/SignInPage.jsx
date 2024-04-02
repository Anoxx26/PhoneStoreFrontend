import './SignInPage.css'
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useState } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function SignInPage(){
    const [cookies, setCookie] = useCookies(['token']);
    const { user } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: 'a@a.ru'
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://localhost:7214/User/SignIn', formData);
          console.log(response.data);
          if (response.data != "False"){
            setCookie('token', response.data, { path: '/', maxAge: 86400 });
            navigate("/")
            
          }
          else{
            console.log("Не вышло брат")
          }
          
        } catch (error) {
          console.error(error);
          console.log("Не вышло")
        }
      }

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    return (
        <>
            <section className="SignInSection">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userName">Логин</label>
                    <input id="userName" name="userName" type="text" onChange={handleChange} value={formData.userName}/>
                    <label htmlFor="password">Пароль</label>
                    <input id="password" name="password" type="password" onChange={handleChange} value={formData.password}/>
                    <button type='submit'>Войти</button>
                    <Link to={"/signup"}>Зарегистрироваться</Link>
                </form>
            </section>
        </>
        
    )
}