import initFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

initFirebase()
const useFirebase = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);
  const [aurthError, setAuthError] = useState('');
  const auth = getAuth();
  //register new  user
  const registerNewUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setLoading(false))
  }
  // sign in user
  const signInUser = (email, password, location, history) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
        const newDestination = location?.state?.from || "/";
        history.replace(newDestination);
        // const user = userCredential.user;
        // setUser(user);
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setLoading(false))
  }
  //hold state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // ...
      } else {
        setUser({})
      }
      setLoading(false)
    });
    return () => unsubscribe;
  }, [])
  //signout user
  const logOut = () => {
    setLoading(true)
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    })
      .finally(() => setLoading(false))

  }


  return {
    user,
    registerNewUser,
    logOut,
    signInUser,
    loading,
    aurthError
  }

}

export default useFirebase;