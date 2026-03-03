import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostsContext } from "../../store/posts/postsContext";

import './style.scss'
import PostOneCard from "../postOneCard.jsx/PostOneCard";
import { useUserContext } from "../../store/user/userContext";

const UserPosts = () => {
  const {userPosts, getUserPosts, getCurrentUserPosts} = usePostsContext();
  const {uidURL} = useParams();
  const {user} = useUserContext();
  const navigate = useNavigate();
  const isOwner = uidURL === user.uid;

  useEffect(() => {
    async function getPosts(){
      if(isOwner) {
        getCurrentUserPosts(store.currentUserPosts);
        return
      };
      await getUserPosts(uidURL);
    }
    getPosts()
  },[ uidURL]);
  
  const onOpenOneUserPost = (id) => {
      navigate('/posts/' + uidURL + '/' + id);
    } 
  return (
    <div className="my-posts-wrap">
      <h2 className="page-title">Посты</h2>
      <div className="my-posts-list">
      {userPosts && userPosts.map((item) => <PostOneCard key={item.id} uid={uidURL} item={item} onOpenOneUserPost={onOpenOneUserPost}/>)}
      </div>
    </div>
  )
}

export default UserPosts
