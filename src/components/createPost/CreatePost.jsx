import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_FIREBASE } from '../../firebase/configure.firebase';
import { useUserContext } from '../../store/user/userContext';
import { usePostsContext } from '../../store/posts/postsContext';
import placeholderImg from '/src/assets/placeholder-img.svg';
import './style.scss';
import AutorisationHOC from '../../HOC/AutorisationHOC';
import { addPostToCurrentUser } from '../../store/store';

const imgTest = {
  url: placeholderImg,
  file: null
}

const CreatePost = () => {
  const [img,setImg] = useState(imgTest);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useUserContext();
  const { createPost } = usePostsContext();
  const navigate = useNavigate();

  const changePhotoUrl = async (e) =>{
    const file = e.target.files[0];
    if(!(file instanceof File)) return 'Error'
    const previewUrl = URL.createObjectURL(file);
    setImg({url: previewUrl , file});
  }

  const onHandleBtnCreate = async () => {
    if(text.trim() === '') return 'Error'
    if(title.trim() === '') return 'Error'
    if(img.url === placeholderImg) return 'Error';
    const post = await createPost({ uid: user.uid, text, title, img: img.file ,name: user.name});
    if(!post) return 'Error'
    navigate('/posts/' + user.uid + '/' + post.id);
  };
  return (
    <>
    <h2 className='page-title'>Создать пост</h2>
    <div className="create-post-wrap">
      <div className="post-img-block">
        <div className="post-img">
          <img src={img.url} alt="" />
        </div>
        <label>
          Загрузить фото
          <input type="file" className="file-input" onChange={changePhotoUrl} accept="image/*" />
        </label>
      </div>
      <div className="post-content">
      <input
        className='post-input'
        type="text"
        placeholder="Имя поста"
        maxLength={22}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="post-textarea"
        placeholder="Введите текст..."
        value={text}
        onChange={(e) => setText(e.target.value)}></textarea>
      <button onClick={onHandleBtnCreate}>Create</button>

      </div>
    </div>
    </>
  );
};

export default AutorisationHOC(CreatePost)


