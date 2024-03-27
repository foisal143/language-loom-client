import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase';

export const AuthContext = createContext(null);
const Authprovaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvaider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvaider);
  };

  const loginEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (loggedUser, name, image) => {
    return updateProfile(loggedUser, { displayName: name, photoURL: image });
  };

  const logout = () => {
    return signOut(auth);
  };

  //
  useEffect(() => {
    const disconect = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      const email = { email: currentUser?.email };

      fetch('http://localhost:5000/jwt', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(email),
      })
        .then(res => res.json())
        .then(data => {
          const { token } = data;

          localStorage.setItem('ln-jwt-token', token);
        });
      setLoading(false);
    });
    return () => disconect();
  }, [auth]);

  const authInfo = {
    user,
    googleLogin,
    loading,
    loginEmailPass,
    signUpEmailPass,
    profileUpdate,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default Authprovaider;
