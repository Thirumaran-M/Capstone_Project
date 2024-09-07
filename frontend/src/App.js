import React, { useEffect } from 'react'
import Home from './pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Impotask from './pages/Impotask';
import Comptasks from './pages/Comptasks';
import Incomp from './pages/Incomp';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

export const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, [])
  
  return (
    <div className="bg-blue-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/Impotask" element={<Impotask />} />
          <Route path="/Comptasks" element={<Comptasks />} />
          <Route path="/Incomp" element={<Incomp />} />
        </Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
export default App;