import initFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile  } from "firebase/auth";
import { useEffect, useState } from "react";


initFirebase()
const useFirebase = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true);
  const [aurthError, setAuthError] = useState('');
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();


  //register new  user
  const registerNewUser = (email, password,name, history ) => {
    console.log('the name is ', name)
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('');
        history.replace('/')
        const newUser = {email, displayName:name}
        setUser(newUser);

        //----------------update profile---------------------///
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
        }).catch((error) => {
        });
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



  //google sign in
  const googleSignIn = (location, history) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAuthError('')
        const newDestination = location?.state?.from || "/";
        history.replace(newDestination);
      }).catch((error) => {
        setAuthError(error.message);
      }).finally(() => setLoading(false));

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
    aurthError,
    googleSignIn
  }

}

export default useFirebase;