import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react"; 
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../store/session";
import { FaDoorOpen } from "react-icons/fa";
import './Navigation.css';

const NavDropDown = () => {
    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const allUsers = useSelector(state => state.entities.users);
    const currentUser = useSelector(state => state.session.currentUser);
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        if (showMenu) return;
        e.stopPropagation();
        setShowMenu(true);
    };

    
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout()).then((res) => {
            if (res.ok) {
                (history.push("/login"));
            }
        })
    };
    
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    
    if (!currentUser) return null;
    
    return (
        
        <>  
            <img src={allUsers[currentUser.id]?.avatarSrc} className="profile-icon" onClick={openMenu}></img>
            {showMenu && (
                <ul className="profile-dropdown-container">
                    <li key="p-link" className="profile-links-container">
                        <p className="profile-name-container">
                        {currentUser && (
                            <Link to={'/users/' + currentUser.id} className="name-container">
                                        <img src={allUsers[currentUser.id]?.avatarSrc} className="profile-dropdown-icon"></img>
                                        <span id="profile-name">{currentUser.firstName}</span>&nbsp;
                                        <span id="profile-name">{currentUser.lastName}</span>
                            </Link>
                            )}
                        </p>
                    </li>
                    <li key="logout-button" className="logout-tab">
                        <div className="logout-button-container">
                            <button className="logout-icon"><FaDoorOpen/></button>
                            <button className="logout-button" onClick={handleLogout}>Log Out</button>
                        </div>
                    </li>
                </ul>
            )}
        </>
    )
}

export default NavDropDown;