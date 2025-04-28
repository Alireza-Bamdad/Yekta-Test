import steyled from './navbar.module.css'
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <div className={steyled.headerWrapper}>
            <Link to="/">Test</Link>
            <Link to="/Admin">Adnin</Link>
        </div>

    )
}

export default Navbar;