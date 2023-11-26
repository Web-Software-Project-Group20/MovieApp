import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Groups from './pages/Groups';

function App() {
  return (
    <BrowserRouter>
      <Link to={'/'}>Home </Link>
      <Link to={'/news'}>News </Link>
      <Link to={'/settings'}>Settings </Link>
      <Link to={'/groups'}>Groups </Link>
      <Link to={'/profile'}>Profile </Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
        <Route path='/news' element={<News />} />
        <Route path='/groups' element={<Groups />} />
        <Route path="/profile" element={<Profile />}> 
            <Route path="favourites" element={<Favourites />} /> 
        </Route>
        {/*Add more routes here*/}
        <Route path='*' element={<h1>Page Not Found</h1>} /> {/*If route is not found, this is displayed*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App
