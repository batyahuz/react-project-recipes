import React, { useEffect } from 'react';
import './App.css';
import HeaderComp from './general-components/header';
import RoutesComp from './general-components/routs';
import Footer from './general-components/footer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SetRecipesDispach } from './services/recipes';
import { SetListDispach } from './services/list';
import { SetCategoriesDispach } from './services/categories';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector(state => ({ userId: state.user.Id }));
  useEffect(() => { dispatch(SetRecipesDispach()); dispatch(SetCategoriesDispach()); }, [])

  useEffect(() => {
    if (userId == undefined) navigate("/login", "");
    else dispatch(SetListDispach(userId));
  }, [userId])

  return (
    <div className="App">
      <HeaderComp />
      <RoutesComp />
      <Footer />
    </div>
  );
}
export default App;
