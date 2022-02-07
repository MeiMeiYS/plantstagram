import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";
import Feed from "./components/post/Feed";
import LogoutButton from './components/auth/LogoutButton';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/accounts/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/accounts/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
        {/* follower following list */}
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
        {/* profile page */}
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/create/select" exact={true}>
          <CreatePost />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <LogoutButton />
          <Feed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
