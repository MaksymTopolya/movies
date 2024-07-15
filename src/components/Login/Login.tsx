import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useEffect } from 'react';
import { useTypedDispatch } from '../../hooks';
import { auth } from '../../Firebase';
import { Link } from 'react-router-dom';
import css from './Login.module.scss';
import { useUser } from '../../context';
const Login = () => {
  const { user, setUser } = useUser();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className={css.container}>
      {user ? (
        <div className={css.userInfo}>
          <h2>Welcome, {user.displayName}</h2>
          <Link to="/">
            <button onClick={logout} className={css.button}>
              Logout
            </button>
          </Link>

          <Link to="/favorite" className={css.link}>
            Favorites
          </Link>
        </div>
      ) : (
        <button onClick={login} className={css.loginBtn}>
          Google Login
        </button>
      )}
    </div>
  );
};

export default Login;
