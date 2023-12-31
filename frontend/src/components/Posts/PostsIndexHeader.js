import { useDispatch } from 'react-redux';
import { openModal } from '../../store/ui';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import OutsideAlerter from '../util/OutsideAlerter';

const PostsIndexHeader = ({currentUser, post}) => {
    const dispatch = useDispatch();
    const { ref, handleClickInside, clickedOutside } = OutsideAlerter();

    const editClickHandler = (post) => {
        dispatch(openModal("edit-post", post));
    }

    return (
        <>
        { currentUser.id === post.authorId ? (
        <div className="options-button-container">
            <button 
                ref={ref}
                onClick={handleClickInside}
                className="open-options-button">
                    ...</button>
            {!clickedOutside ? 
            <div className="options-menu">
                <button 
                    className="edit-post-button" 
                    onClick={() => editClickHandler(post)}>
                        <FaPencilAlt />
                        Edit post</button>
                <button 
                    className="delete-post-button" 
                    onClick={() => 
                                dispatch(openModal(
                                    "delete-post", 
                                    post))}> 
                        <FaRegTrashAlt/> 
                        Move to trash</button>
            </div> : null }
        </div> ) : null }
        </>
    )
}

export default PostsIndexHeader;


