import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { UserProvider } from './store/user/UserProvider';
import { PostsProvider } from './store/posts/PostsProvider';
import { Provider } from 'react-redux';
import { store } from './redux';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
      <UserProvider>
        <PostsProvider>
            <App />
        </PostsProvider>
      </UserProvider>
    </Provider>
  </BrowserRouter>,
);
