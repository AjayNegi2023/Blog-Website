import React,{useState} from 'react';
import Login from "./Component/Account/Login";
import DataProvider from './Component/Context/DataProvider'
import Home from './Component/Home/Home';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import Header from './Component/Header/Header';
import CreatPost from './Component/Create/CreatPost';
import DetailsView from './Component/Details/DetailsView';
import Update  from './Component/Create/Update';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';

const PrivateRoute= ({isAuthenticated,...props})=>{
  return isAuthenticated?<>
  <Outlet/>
  <Header/>
   </>
   :
   <Navigate replace to="/login"/>
}
function App() {

  const [isAuthenticated,isuserAuthenticated]= useState(false);
  return (

    <DataProvider>
    <BrowserRouter>
    
      <div style={{ marginTop: 64 }}>
        <Routes>
        <Route path="/login" element={<Login isuserAuthenticated={isuserAuthenticated}/>}/>
        <Route path="/" element={<PrivateRoute isAuthenticated= {isAuthenticated}/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
        <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/create" element={<CreatPost/>} />
        </Route>
        <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/details/:id" element={<DetailsView/>} />
        </Route>
        <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/update/:id" element={<Update/>} />
        </Route>
        <Route path="/about" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/about" element={<About/>} />
        </Route>
        <Route path="/contact" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/contact" element={<Contact/>} />
        </Route>
        </Routes>
       
      </div>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
