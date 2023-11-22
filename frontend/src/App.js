import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Link to={'/'}>Home </Link> {/*Demonstration: Shows in every page and can be used to navigate*/}
      <Link to={'/news'}>News</Link>
      <Routes> {/*Routes are defined here*/}
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} >
          <Route path=':articleId' element={<Article />} />{/*Shows article as a nested route*/}
        </Route>
        {/*Add more routes here*/}
        <Route path='*' element={<h1>Page Not Found</h1>} /> {/*If route is not found, this is displayed*/}
      </Routes>
    </BrowserRouter>
  );
}

{/*Components for the routes*/ }
function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function News() {
  const nav = useNavigate(); //useNavigate is used to navigate to a route
  return (
    <div>
      <h1>News</h1>
      <button onClick={() => nav('article')} >Article</button>
      <Outlet /> {/*Outlet is used for nested routes =Component inside a component*/}
    </div>
  )
}

{/*Can be changed to use params (':articleId' etc.)*/ }
function Article() {
  return (
    <div>
      <h1>Article</h1>
    </div>
  )
}

export default App
