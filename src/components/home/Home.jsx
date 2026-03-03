import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpdateForLiveTopPosts } from '../../firebase/socket/socket';
import { usePostsContext } from '../../store/posts/postsContext';
import { store } from '../../store/store';
import Avatar from '../helper/Avatar';
import TopOneCard from '../topOneCard/TopOneCard';
import './style.scss';

function Home() {
  const { topNewPosts, onUpdateNewTopPosts, onUpdateLikeTopPosts, topLikesPosts, topAuthors, getTopAuthors } = usePostsContext();
  const navigate = useNavigate();
 
  useEffect(() => {
    async function getTopPosts() {
      await getTopAuthors();
    }
    getTopPosts();
  }, []);

  useEffect(()=>{
    const unsubscribeNew =  getUpdateForLiveTopPosts('new',onUpdateNewTopPosts);
    const unsubscribeLike =  getUpdateForLiveTopPosts('likes',onUpdateLikeTopPosts);
    return () => {
      unsubscribeNew();
      unsubscribeLike
    }
  }, [])
  return (
    <div className="home-wrapper">
      <div className="home-section">
        <h2>Новые посты</h2>
        {/* <button onClick={() => navigate(-1)}>back</button> */}
        <div className="content-wrap">
          <div className="posts-list">
            {topNewPosts?.length > 0 &&
              topNewPosts.map((item) => <TopOneCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
      <div className="home-section">
        <h2>Популярные посты</h2>
        <div className="content-wrap">
          <div className="posts-list">
            {topLikesPosts?.length > 0 &&
              topLikesPosts.map((item) => <TopOneCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
      <div className="home-section">
        <h2>Топ авторы</h2>
        <div className="content-wrap">
        <div className="posts-list">
          {topAuthors?.length > 0 &&
          topAuthors?.map((item) => <div className='top-authors-card' key={item.uid}>
            <Avatar uid={item.uid} onClick={() => navigate('/posts/' + item.uid)}/>
            <div>{item.name}</div></div>)}

        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
