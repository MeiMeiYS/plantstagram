import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DirectInbox.css';
import your_message from '../../images/your_messages.png';
import { getFollowings } from '../../store/followers';


const DirectInbox = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const [chatUser, setChatUser] = useState('');
    const [conversation, setConversation] = useState({});
    const [hiddenMessage, setHiddenMessage] = useState(true)

    // useEffect(()=> {
    //     dispatch(getFollowings(currentUser.id)).then(res => {
    //         if (res) {
    //             const users = Object.values(res);
    //             setAllFollowings(users);
    //         }
    //     });
    // }, [dispatch])

    const handleSendMessage = e => {
        setHiddenMessage(false);
    }

    return (
        <div className='direct-inbox'>
            <div className='direct-inbox-sidebar'>
               <div className='header'>
                   <p>{currentUser.username}</p>
               </div>
               {conversation.length ?
                <h1>replace me</h1>
               :
                <p className='no-conversation'>You have no conversation yet.</p>
               }
               {/* <div className='chat-user' onClick={e => setChatUser('demouser')}>
                    <div className='avatar'>
                        <img src='' alt='user avatar'></img>
                    </div>
                    <div className='username'>
                        <p>username here</p>
                    </div>
               </div> */}
            </div>
            <div className='direct-inbox-main-content'>
                {!chatUser ?
                    <div className='default-display'>
                        <img src={your_message} alt='Messages icon'></img>
                        <p>Your Messages</p>
                        <span>Send private messages to a friend.</span>
                        <button type='button' onClick={handleSendMessage}>Send Message</button>
                        <div className={`under-construction ${hiddenMessage && 'hidden-message'}`}>
                            <span>This feature is under construction</span>
                            <span>Will be coming soon</span>
                        </div>
                    </div>
                    :
                    <div className='user-message-content'>
                        <div className='header'>
                            <p>{currentUser.username}</p>
                        </div>
                        <div className='messages-container'>
                            <div className='message-row'>
                                <div className='received-message-container message-container'>
                                    <p>sample message</p>
                                </div>
                            </div>
                            <div className='message-row'>
                                <div className='send-message-container message-container'>
                                    <p>samlllhglnwek.lwhkarklh.lwajernlndkjsjErnilghjkl</p>
                                </div>
                            </div>
                        </div>
                        <div className='chat-section'>
                            <form className='chat-input'>
                                <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                                <textarea placeholder='Message...'></textarea>
                                <button type='submit' >Send</button>
                            </form>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default DirectInbox;
