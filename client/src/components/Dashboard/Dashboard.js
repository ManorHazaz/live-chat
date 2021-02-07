import { Sidebar } from '../Sidebar'
import './Dashboard.css'

function Dashboard({ contacts, onlineUser }) {
    return (
        <div className='dashboard'>
            <Sidebar onlineUser={ onlineUser } contacts={contacts} />
            
        </div>
    )
}

export default Dashboard
