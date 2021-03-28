import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function LogIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    error: '',
    photo: '',
    success: false
  });
  const [fbUser, setFbUser] = useState({
    isFbSignIn: false,
    name: ' ',
    email: ' ',
    photo: ' '
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
    }).catch((error) => {
      //
    })
  }
  const handleSignOut = () => {
   firebase.auth().signOut()
   .then(() => {
      const singOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        nickName: '',
      }
      setUser(singOutUser)
   })
   .catch((error) =>{
     //
   })
  }
  const handleOnBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      isFieldValid = event.target.value.length > 7 && /\d{1}/.test(event.target.value);
      
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (event) => {
    let newUserInfo = {...user};
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        newUserInfo.error = ' ';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name)
      })
      .catch((error) => {
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        newUserInfo.error = ' ';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    event.preventDefault();
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(() => {
      //
    }).catch(error => {
      //
    });
  }
  const handleFbSignIn = () => {
      firebase.auth().signInWithPopup(fbProvider).then((result) => {
      const {displayName, email, photoURL} = result.user; 
      const signedInFbUser = {
        isFbSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setFbUser(signedInFbUser);
      setLoggedInUser(signedInFbUser);
    })
    .catch((error) => {
     //
    });
  }
  const handleFbSignOut = () => {
    firebase.auth().signOut().then(() => {
      const signedOutFbUser = {
        isFbSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setFbUser(signedOutFbUser)
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div style={{textAlign: 'center'}}>
        {user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign in</button>}
        <br/>
        
        {fbUser.isFbSignIn ? <button onClick={handleFbSignOut}>Sign out facebook</button> : <button onClick={handleFbSignIn}>Sign in with facebook</button>}

        <h2>Our own Authentication</h2>
        <form onSubmit={handleSubmit}>
          <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" id="newUser"/>
          <label htmlFor="newUser">New user sign up</label>
          <br/>
          {newUser && <input type="text" onBlur={handleOnBlur} name="name" required placeholder="Enter Your name"/>}
          <br/>
          <input type="text" onBlur={handleOnBlur} name="email" required placeholder="Enter Your email"/>
          <br/>
          <input type="password" onBlur={handleOnBlur} name="password" required placeholder="Enter Your password"/>
          <br/>
          <input type="submit" value="submit"/>
          <h2 style={{color: 'red'}}>{user.error}</h2>
          {user.success && <h2 style={{color: 'green'}}>Your account has been {newUser? 'created': 'logged In'} successfully</h2>}
        </form>
    </div>
  );
}

export default LogIn;





