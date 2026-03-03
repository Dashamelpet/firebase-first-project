import { useEffect } from 'react';
import { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { getCommentsDateFromDB } from '../../firebase/comments';
import { useCommentsContext } from '../../store/comments/commentsContext';
import { useUserContext } from '../../store/user/userContext';
import Button from '../uix/Button';
import './style.scss'

const Comments = ({isLogin, isOwner}) => {
    const [text, setText] = useState('');
    const {createComment, commentsList, setCommentsList, deleteComment} = useCommentsContext();
    const {uidURL, id} = useParams();
    const {user} = useUserContext();
    const navigate = useNavigate();
    
    useEffect(() =>{
        async function getAllComments(){
            const response = await getCommentsDateFromDB({postAuthorUid:uidURL, postId:id});
            if(!response.ok) return 'error'
            setCommentsList(response.data);
        }
        getAllComments()
    }, [uidURL,id])

    const onAddComment = async() =>{
        if (text.trim() == '') return 'error'
        await createComment( {
            postAuthorUid:uidURL, //
            postId:id, 

            commentAuthorUid: user.uid, 
            text, 
            userName: user.name
        });
        setText('')
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
                    {isOwner && <Button className='delete-comment-btn' onClick={()=>deleteComment(item.date, user.uid, id)} text="x"/>}
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


