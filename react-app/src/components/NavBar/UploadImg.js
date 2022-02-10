import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/posts";
import './UploadImg.css';
import anonymous_user from '../../images/anonymous_user.jpeg';
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadImg = ({ showUploadImage, setShowUploadImage }) => {
    const [errors, setErrors] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [fileChosen, setFileChosen] = useState("");
    const [progress, setProgress] = useState(0);
    const [localUrl, setLocalUrl] = useState(false);
    const [preview, setPreview] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const uploadImgUI = useRef();
    const file = useRef();
    // if click share post and it went successfully, the menu will close

    //vvvvvvv firebase code
    const uploadImg = (imageFile) => {
        if (!imageFile) return;
        const storageRef = ref(storage, `/images/${sessionUser.id}-${sessionUser.username}-${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => setImgUrl(url))
            }
        );
    }

    useEffect(() => {
        //vvv if menu is closed, return
        if (!showUploadImage) return ;

        //vvv if menu is opened, attached event listener
        const closeMenu = e => {
            // if click outside of the UI menu, the menu will close
            if (uploadImgUI.current && !uploadImgUI.current.contains(e.target)) {
                setShowUploadImage(false);
            }
        };
        document.addEventListener('click', closeMenu);

        //vvv clean up function to remove event listener
        return () => document.removeEventListener("click", closeMenu);
    }, [showUploadImage])

    useEffect(() => {
        if (localUrl) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                console.log('@@@@@@@@@@@@@@@',reader.result)
            }
            reader.readAsDataURL(localUrl);
        } else {
            setPreview(false);
        }
    }, [localUrl])

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createPost(imgUrl, desc));
        if (data) {
            setErrors(data);
        }
    };

    const handleChooseAnImg = e => {
        e.preventDefault();
        const imageFile = e.target[0].files[0];
        uploadImg(imageFile);
    }

    // const updateImgUrl = (e) => {
    //     setImgUrl(e.target.value);
    // };

    const updateDesc = (e) => {
        setDesc(e.target.value);
    };

    const imagePreview = e => {
        e.preventDefault();
        const localImage = e.target.files[0]
        console.log(file)
        // if (file && file.type.substring(0, 5) === "image") {
        //     setLocalUrl(localImage);
        // } else {
        //     setLocalUrl(false);
        // }
        if (file) {
            setLocalUrl(localImage);
        } else {
            setLocalUrl(false);
        }
    }

    return (
        <div className="background-overlay">
            <div className="upload-img-UI-container" ref={uploadImgUI}>
                <div className="header">
                    <h2>Create new post</h2>
                </div>
                <div className="upload-img">
                    <div className="choose-img">
                        <svg color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                        {preview ? <div className="preview-image"><img src={preview} alt="Image preview"></img></div> : null}
                        <p>Upload a photo here</p>
                        {/* <p>Uploaded {progress}%</p> */}
                        <form onSubmit={handleChooseAnImg}>
                            <label htmlFor="upload-img-input" className="select-upload-img-btn">Select from computer</label>
                            <input
                                id='upload-img-input'
                                type="file"
                                value={fileChosen}
                                onChange={imagePreview}
                                ref={file}
                                multiple={false}
                                accept="image/*"
                            />
                            {/* <button type="submit" className="select-upload-img-btn">upload</button> */}
                        </form>
                    </div>
                </div>
                <div className="write-post-caption">
                    <div className='upload-img-user-row'>
                        <div className='upload-img-profile-img-container'>
                            <img alt='anonymous user' src={anonymous_user}></img>
                        </div>
                        <span className='upload-img-username-display'>{sessionUser.username}</span>
                    </div>
                    <form onSubmit={onSubmit}>
                        {/* <div>
                            <label htmlFor="imgUrl">ImgUrl</label>
                            <input
                            name="imgUrl"
                            type="text"
                            placeholder="ImgUrl"
                            value={imgUrl}
                            onChange={updateImgUrl}
                            />
                        </div> */}
                        <textarea
                        name="desc"
                        type="desc"
                        placeholder="Write a caption..."
                        value={desc}
                        onChange={updateDesc}
                        />
                        <div className="errors">
                            {errors.map((error, ind) => (
                            <p key={ind}>{error}</p>
                            ))}
                        </div>
                        <div className="submit-new-post">
                            <button type="submit">Share</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default UploadImg
