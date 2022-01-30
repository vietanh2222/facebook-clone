import React from "react";
import './App.css';
import Home from "./pages/home/Home";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from './store/StateProvider';
import Friends from './pages/friends/Friends';
import NoPage from './pages/nopage/NoPage';
import Layout from './pages/layout/Layout';
import Watch from "./pages/watch/Watch";
import Groups from './pages/group/Groups';
import Gaming from "./pages/gaming/Gaming";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";


function App() {
  
  const [{ user }] = useStateValue();
  return (
    <div className="app">
      {!user ? <Login />
        : (
          <>
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="friends" element={<Friends />} />
                  <Route path="watch" element={<Watch />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="gaming" element={<Gaming />} />
                  <Route path="search" element={<Search />} />
                  <Route path="profile/*" element={<Profile />}>
                    <Route path=":id" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
              </BrowserRouter>
          </>
        )}
    </div>
  );
}

export default App;
