import initFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { useEffect, useState } from "react";

initFirebase()
const useFirebase = () => {
    const [user, setUser] = useState({})
    const auth = getAuth();
    //register new  user
    const registerNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    //hold state change
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            setUser(user);
              // ...
            } else {
            setUser({})
            }
          });
          return ()=> unsubscribe;
    }, [])
    //signout user
    const logOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
          
    }
    
    
    return {
        user,
        registerNewUser,
        logOut,
    }

}

export default useFirebase;