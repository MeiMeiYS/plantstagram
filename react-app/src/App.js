import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import CreatePost from "./components/post/CreatePost";
import Post from "./components/post/Post";
import Feed from "./components/post/Feed";
import SettingsForm from "./components/SettingsForm/";
import Profile from './components/profile/Profile';
import Footer from "./components/Footer";
import DirectInbox from "./components/DirectInbox";

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
      <Switch>
        <Route path="/accounts/login" exact={true}>
          <LoginForm />
          <Footer />
        </Route>
        <Route path="/accounts/sign-up" exact={true}>
          <SignUpForm />
          <Footer />
        </Route>

        <ProtectedRoute path="/users" exact={true}>
          <NavBar />
          {/* follower following list */}
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/:username" exact={true}>
        {/* profile page */}

          {/* <User /> */}
          <NavBar />
            <Profile />
          {/* profile page */}
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/create/select" exact={true}>
          <CreatePost />
        </ProtectedRoute>
        <ProtectedRoute path="/direct/inbox" exact={true}>
          <NavBar />
          <DirectInbox />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/explore" exact={true}>
          <NavBar />
          {/* explore */}
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <NavBar />
          <Feed />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/accounts/edit" exact={true}>
          <NavBar />
          <SettingsForm />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path="/accounts/password/change" exact={true}>
          <NavBar />
          <SettingsForm />
          <Footer />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
