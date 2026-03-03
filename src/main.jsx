import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { LoadingProvider } from './store/loading/LoadingProvider';
import { UserProvider } from './store/user/UserProvider';
import { PostsProvider } from './store/posts/PostsProvider';
import { CommentsProvider } from './store/comments/CommentsProvider';
import { apiLoading } from './firebase/helper.api';
// console.log('start')

// console.log(apiLoading)
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingProvider>
      <UserProvider>
        <PostsProvider>
          <CommentsProvider>
            <App />
          </CommentsProvider>
        </PostsProvider>
      </UserProvider>
    </LoadingProvider>
  </BrowserRouter>,
);
