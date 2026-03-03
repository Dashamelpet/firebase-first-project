import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/createPost/CreatePost';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Loading from './components/loading/Loading';
import UserPosts from './components/userPosts/UserPosts';
import PostItem from './components/posts/PostItem';
import UserSettings from './components/userSettings/UserSettings';
import { UserContext, useStoreUserContext } from './store/user/userContext';
import { LoadingContext, loadingContextCustom, useLoadingContext } from './store/loading/loadingContext';
import { PostsContext, postsContextCustom } from './store/posts/postsContext';
import { LoadingProvider } from './store/loading/LoadingProvider';
import { PostsProvider } from './store/posts/PostsProvider';
import { UserProvider } from './store/user/UserProvider';
import AllPosts from './components/allPosts/AllPosts';
import RightMenu from './components/rightMenu/RightMenu';


function App() {
  const {isLoading} = useLoadingContext();
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
          {/* <RightMenu /> */}
        </div>

  );
}

export default App;




// HOC 
//  