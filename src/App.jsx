import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { MyContext, useStoreMyContext } from './store/context';

function App() {
  const storeMyContext = useStoreMyContext();

  return (
    <MyContext.Provider value={storeMyContext}>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
