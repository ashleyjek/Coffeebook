import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OutsideAlerter from "../util/OutsideAlerter";
import { fetchProfileUser } from "../../store/users";

const SearchBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [timer, setTimer] = useState(0);
    const searchResults = useSelector(state => Object.values(state.entities.search));

    const {
        ref: searchRef,
        handleClickInside: handleClickInside,
        clickedOutside: clickedOutside
    } = OutsideAlerter();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchText(query);
        clearTimeout(timer);
        if (query.trim() !== "") {
            setTimer(setTimeout(() => dispatch(fetchSearchResults(query)), 300));
        } else {
            dispatch(clearSearchResults());
        }
    };

    const handleClick = (id) => {
        return (e) => {
            e.preventDefault()
            dispatch(fetchProfileUser(id));
            history.push(`/users/${id}`)
        }
    };
    
    return (
        <div className="searchbar-container">
            <input 
                ref={searchRef}
                onChange={handleSearch}
                onClick={handleClickInside}
                type="text"
                className="home-search-bar"
                placeholder="Search Coffeebook"
                value={searchText}/>
            { searchText && searchResults && 
                <ul 
                    id="search-dropdown">
                    {searchResults.map((user) => {
                        if (!clickedOutside) {
                            return (
                                <li 
                                    key={user.id}
                                    className="search-result"
                                    onClick={handleClick(user.id)}>
                                        <img src={user.avatarSrc}/>
                                        {user.firstName} {user.lastName}
                                    </li>
                            )
                        }
                    })}
                    </ul>
            }
            
        </div>
    )
}

export default SearchBar;