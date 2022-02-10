import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DirectInbox.css';
import your_message from '../../images/your_messages.png';


const DirectInbox = () => {
    const currentUser = useSelector(state => state.session.user);

    return (
        <div className='direct-inbox'>
            <div className='direct-inbox-sidebar'>
               <div className='header'>
                   <p>{currentUser.username}</p>
               </div>
               <div className='chat-user'>
                    <div className='avatar'>
                        <img src='' alt='user avatar'></img>
                    </div>
                    <div className='username'>
                        <p>username here</p>
                    </div>
               </div>
            </div>
            <div className='direct-inbox-main-content'>
                <div className='default-display'>
                    <img src={your_message} alt='Messages icon'></img>
                    <p>Your Messages</p>
                    <span>Send private messages to a friend.</span>
                    <button>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default DirectInbox;
