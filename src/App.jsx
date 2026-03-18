import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/createPost/CreatePost';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Loading from './components/loading/Loading';
import UserPosts from './components/userPosts/UserPosts';
import PostItem from './components/posts/PostItem';
import UserSettings from './components/userSettings/UserSettings';
import AllPosts from './components/allPosts/AllPosts';
import RightMenu from './components/rightMenu/RightMenu';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from './redux/loading.provider';
import { setStoreLoading } from './store/store';


function App() {
  const {isLoading} =  useSelector((store) => store.loadingStore);
  const dispatch = useDispatch();

  useEffect(() => {
    setStoreLoading(
      () => dispatch(setLoading(true)), 
      () => dispatch(setLoading(false))
    );
  }, []);

  return (
        <div className="page-wrapper">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/posts/:uidURL/:id" element={<PostItem />} />
              <Route path="/posts/:uidURL" element={<UserPosts/>}/>
              {/* <Route path="/myPosts" element={<MyPosts/>}/> */}
              <Route path="/allPosts" element={<AllPosts/>}/>
            </Routes>
          </main>
          {isLoading && <Loading />} 
          <ToastContainer />
          {/* <RightMenu /> */}
        </div>

  );
}

export default App;
 