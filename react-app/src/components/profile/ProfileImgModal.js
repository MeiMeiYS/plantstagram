import './ProfileImgModal.css';
import {useDispatch } from "react-redux";
import {removeProfileImg } from '../../store/users';


const ProfileImgModal = ({profileUser, showProfileImgModal, setShowProfileImgModal, overlay, setOverlay}) => {
    const dispatch = useDispatch();
    // const [profileUser, setProfileUser] = useState()
    const handleOverlay = e => {
        setShowProfileImgModal(false)
        setOverlay(false)
    }
    
    const show = () => {
        document.querySelector(".remove_option_container").classList.add("hidden")
        document.querySelector(".remove_confirm_container").classList.remove("hidden")
        
    }
    const remove =()=> {
        if (profileUser) {
            dispatch(removeProfileImg(profileUser.id))
        }
    }
    
    const cancel=() => {
        setShowProfileImgModal(false)
        setOverlay(false)
    }
    // const submit = (e) => {
    //     const fileType = ["jpeg", "jpg", "png", "gif"]
    //     const filteredFile = fileType.find(item => {
    //         e.target.files[0].type.includes(item)
    //     })
    // }
    
    return (
        <>
            <div className="background-overlay" onClick={handleOverlay}>
                <div className="profileImg-modal">
                    <div className="remove_option_container">
                        <div className="edit_prof_header">
                            <img className="edit_profile_img" src={profileUser.avatar_url} alt="Profile Image"></img>
                            <div className="edit_curr">
                                Current Profile Image
                            </div>
                        </div>
                        <label className="upload_option" htmlFor="files">
                            Upload Image
                            <input id="files" 
                            type="files" 
                            className="hidden" 
                            accept="image/*"
                            // onChange={e=>submit(e)}
                            ></input>
                        </label>
                        <div className="remove_option" onClick={()=>show()}>
                            Remove Current Image
                        </div>
                        <div className="cancel_option" onClick={e=>cancel()}>
                            Cancel
                        </div>
                    </div>
                    <div className="remove_confirm_container hidden">
                        <div className="remove_confirm_head">
                            <div className="remove_header">
                                Remove Image From plantsagram
                            </div>
                            <div className="hint">
                                Your image will be removed permanently after confirm
                            </div>
                        </div>
                        <div className="confirm_option" onClick={remove}>
                            Remove
                        </div>
                        <div className="confirm_cancel" onClick={()=>cancel()}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileImgModal