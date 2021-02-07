import Contact from './components/Contact'
import './Sidebar.css'

function Sidebar({ contacts, onlineUser }) {
    return (
        <div className='sidebar'>
            <h2 className='username'>
                { onlineUser }
            </h2>
            <div className='contacts'>

            </div>
        </div>
    )
}

export default Sidebar
