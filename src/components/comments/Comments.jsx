import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { getCommentsDateFromDB } from '../../firebase/comments';
import { createErrorNotification } from '../../firebase/helper.api';
import { createComment, deleteComment, getCommentsList } from '../../redux/comments.provider';
import { useUserContext } from '../../store/user/userContext';
import Button from '../uix/Button';
import './style.scss'

const Comments = ({isLogin, isOwner}) => {
    const [text, setText] = useState('');
    const {uidURL, id} = useParams();
    const {user} = useUserContext();
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const commentsList = useSelector(store => store.commentsStore.commentsList);

    useEffect(() =>{
        async function getAllComments(){
            const response = await getCommentsDateFromDB({postAuthorUid:uidURL, postId:id});
            if(!response.ok) return createErrorNotification('Ошибка при получении данных с сервера.')
            dispatch(getCommentsList(response.data));
        }
        getAllComments()
    }, [uidURL,id])

    const onAddComment = async() =>{
        if (text.trim() == '') return createErrorNotification('Комментарий не может быть пустым')
        const response = await dispatch(createComment( {
            postAuthorUid:uidURL, //
            postId:id, 
            commentAuthorUid: user.uid, 
            text, 
            userName: user.name
        }));

        if(response.ok) setText('')
    }
    const onOpenUserPosts = (uid) =>{
        navigate('/posts/' + uid)
    };
  return (
    <div className="post-comments">
          <div className="comments-title">Комментарии</div>
          {commentsList.length !== 0 && <div className="comments-list">
                {commentsList?.map(item => {
                    return (<div className='comment-item' key={item.date}>
                    <span className='comment-username' onClick={() => onOpenUserPosts(item.authorID)}>{item.userName || 'noname'}</span>
                    <span className='comment-text'>{item.text}</span>
                    {isOwner && <Button className='delete-comment-btn' onClick={()=> dispatch(deleteComment({date:item.date, uid:user.uid, id} ))} text="x"/>}
                </div>)
                })}
            
          </div>}
          {isLogin && <div className="add-comment-block">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Добавить комментарий..."/>
            <Button onClick={onAddComment} text='Добавить'/>
          </div>}
          
    </div>
  )
}

export default Comments


