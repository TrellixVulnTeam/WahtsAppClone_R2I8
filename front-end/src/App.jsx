import React, { useContext } from 'react';
import './App.scss';
import Main from './components/Main/Main'
import SignIn from './components/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';
import FriendCircle from './components/FriendCircle/FriendCircle';
import { AuthContext } from './context/AuthContext';
function App() {


  const{user} = useContext(AuthContext)
  return (
    <div className="App">
      <div className="body">

    <Router>
      <Switch>

      <Route exact path='/'>
        {user ? <Main/> :<Register /> }
        </Route>

        <Route path='/friendcircle'>
        <FriendCircle/>
        </Route>

        <Route path='/signin'>

          {user ? <Redirect to = "/" /> :<SignIn /> }
        </Route>

        <Route path='/register'>
        {user ? <Redirect to = "/" /> :<Register /> }
        </Route>
        
        <Route path="/profile/:username">
          <Profile />
        </Route>
    
      </Switch>
    </Router>


      </div>

    </div>
  );
}

export default App;
