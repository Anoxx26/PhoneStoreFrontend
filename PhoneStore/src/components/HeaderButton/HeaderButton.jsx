import './HeaderButton.css'

export default function HeaderButton({ children }){
    return (
        <button className='headerbutton'>
            {children}
        </button>
    )
}