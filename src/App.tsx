import React, { Dispatch } from 'react';
import Layout from './components/ui/layout';
import 'react-toastify/dist/ReactToastify.css';
import "./css/index.css"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './redux/store';
import HomestaysPage from './pages/homestays';
import SingleHomestayPage from './pages/singleHomestay';
import { InitailLoad } from './redux/reducers/app';
import NotFound from './pages/404';
import ProfilePage from './pages/profile';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
     dispatch(InitailLoad())
  },[])

  return (
    <Router>
      <Layout>
      <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/homestay' element={<HomestaysPage />} />
            <Route path='/homestay/:id' element={<SingleHomestayPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='*' element={<NotFound/>} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
