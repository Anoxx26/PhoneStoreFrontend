import './Header.css'
import { Link } from 'react-router-dom'
import { useUser } from '../UserContext';

export default function Header(){
    const { user } = useUser();
    
    return (
        <header className='header'>
            <div className='logo-div'>
                <p>Телефоны.ру</p>
            </div>
            <nav className='nav'>
                <div className='header-link-div'>
                    <Link className='link-header' to={'/'}>Каталог</Link>
                    
                    <Link style={{marginLeft: "10px"}} to={'cart'} className='link-header'>Корзина</Link>
                    {
                        user === null ? null : (
                            user.role === "Администратор магазина" ? 
                            <>
                                <Link style={{marginLeft: "10px"}} className='link-header' to={'productmanager'}>Товары</Link>
                                <Link style={{marginLeft: "10px"}} className='link-header' to={'ordermanager'}>Заказы</Link>
                            </>
                                 
                                : user.role === "Системный администратор" ? 
                                <Link style={{marginLeft: "10px"}} className='link-header' to={'usermanager'}>Пользователи</Link> 
                                : null
                        )
                    }
                </div>
                <div className='header-profile-div'>
                    
                    {user === null ? (
                        <Link className='link-header' to={'login'}>Авторизация</Link>
                    ) : ( <Link className='link-header' to={'profile'}>{user.username}</Link> )}
                    
                </div>
            </nav>
        </header>
    )
}