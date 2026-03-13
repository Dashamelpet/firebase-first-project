import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpdateForLiveTop } from '../../firebase/socket/socket';
import { usePostsContext } from '../../store/posts/postsContext';
import { store } from '../../store/store';
import Avatar from '../helper/Avatar';
import TopOneCard from '../topOneCard/TopOneCard';
import './style.scss';

function Home() {
  const {
    topNewPosts,
    onUpdateNewTopPosts,
    onHandleSetTopAuthor,
    onUpdateLikeTopPosts,
    topLikesPosts,
    topAuthors,
  } = usePostsContext();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeNew = getUpdateForLiveTop('new', onUpdateNewTopPosts);
    const unsubscribeLike = getUpdateForLiveTop('likes', onUpdateLikeTopPosts);
    const unsubscribeAutors = getUpdateForLiveTop('avtor', onHandleSetTopAuthor);
    return () => {
      unsubscribeNew();
      unsubscribeLike();
      unsubscribeAutors();
    };
  }, []);

  return (
    <div className="home-wrapper">
      <div className="home-section">
        <h2>Новые посты</h2>
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
              topAuthors?.map((item) => (
                <div className="top-authors-card" key={item.uid}>
                  <Avatar uid={item.uid} onClick={() => navigate('/posts/' + item.uid)} />
                  <div>{item.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
