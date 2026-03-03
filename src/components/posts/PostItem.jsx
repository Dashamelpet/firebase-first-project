import { useState } from 'react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStoreUserContext, useUserContext } from '../../store/user/userContext';
import { getUpdateForLivePost } from '../../firebase/socket/socket';
import { usePostsContext } from '../../store/posts/postsContext';
import {getURL_IMG } from '../../firebase/apiImg';
import Comments from '../comments/Comments';

import './style.scss';
import Avatar from '../helper/Avatar';
import { deletePostFromCurrentUser } from '../../store/store';
import Image from '../uix/Image';
import Button from '../uix/Button';

const PostItem = () => {
  const navigate = useNavigate();
  const param = useParams();
  
  const { getCurrentPost, changeLiketoDB, deleteOnePost } = usePostsContext();
  const {isLogin} = useStoreUserContext();
  const { user } = useUserContext();
  const { uidURL, id } = param;
  const [currentPost, setCurrentPost] = useState({});
console.log(currentPost)
  const uidOwner = user?.uid;
  const isOwner = uidOwner === uidURL;

  useEffect(() => {
     const spanshot = getUpdateForLivePost({uid: uidURL, id }, setCurrentPost);
    return () => {
      spanshot()
    }
    
  }, [uidURL, id]);//


  const isILike = useMemo(() => {
    return currentPost?.like?.includes(uidOwner);
  }, [currentPost]);

  const onHandleClickDeletePost = async () => {
    const response = await deleteOnePost({ uid: uidURL, id: id, name:user.name});
    navigate('/posts/' + uidURL);
  };

  const onChangeLike = async () => {
    if(!isLogin) return
    const post = await changeLiketoDB({ uidURL, uidOwner, id , ownerName:user.name});
    setCurrentPost(post)
  };
  return (
    <div className="post-item-wrapper">
      <Button className="btn-back" onClick={() => navigate(-1)} text={'<<'}/>
      <div className="post-item-card">
        <div className="user-info">
          <Avatar uid={uidURL} onClick={() => navigate('/posts/' + uidURL)}/>
        </div>
        <div className="post-img-block">
            <Image src={getURL_IMG(uidURL, id)} className="post-img" />
            {/* <Image {src, onClick = () => {}, defaultImg = defaultImgSRC, alt = 'img', className = "image"} /> */}
          <div className="like-block" onClick={onChangeLike}>
            <span className="like">
              {currentPost?.like?.length}
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 20.5l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5 4 3 6.5 3c1.74 0 3.41 1.01 4.22 2.44C11.59 4.01 13.26 3 15 3 17.5 3 19.5 5 19.5 7.5c0 3.78-3.4 6.86-8.55 11.68L12 20.5z"
                  fill={isILike ? "rgba(159, 134, 192, .8)" : "rgba(255,255,255,0.7)"}
                />
              </svg>
            </span>
          </div>
          <div className="post-title">{currentPost?.title}</div>
        </div>
        <div className="post-content">
          <div className="post-text">{currentPost?.text}</div>
        </div>
        <Comments isLogin={isLogin} isOwner={isOwner}/>

        {/*//! for remove and edit post */}
        {isOwner && (
          <div className="btns-group">
            <Button className="btn-delete" onClick={onHandleClickDeletePost} text="Удалить"/>
          </div>
        )}

      </div>
    </div>
  );
};

export default PostItem;
