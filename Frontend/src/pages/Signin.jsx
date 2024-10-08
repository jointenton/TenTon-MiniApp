import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/user/userSlice';
// import Cookies from 'js-cookie';
// import { toast } from 'react-hot-toast';// Ensure you have a video file in the assets folder
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const apiUrl = "https://tenton-miniapp-q5q5.onrender.com/api/";

  const { signIn } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formData)
    navigate('/')
    // try {
    //   dispatch(signInStart());
    //   const res = await fetch(`${apiUrl}users/signin`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json(); 
    //   console.log(data)

    //   if (data.success === false) {
    //     dispatch(signInFailure(data.message));
    //     toast.error(data.message, {
    //       position: 'bottom-center',
    //     });
    //     return;
    //   }

    //   if (data.token) {
    //     Cookies.set('access_token', data.token, { expires: 1 });
    //     localStorage.setItem('currentUser', JSON.stringify(data));
    //   }

    //   dispatch(signInSuccess(data));
    //   navigate('/');
    // } catch (error) {
    //   dispatch(signInFailure(error.message));
    //   console.log(error)
    //   toast.error(error.message, {
    //     position: 'bottom-center',
    //   });
    // }
  };

  return (
    <div className="relative h-screen">
      {/* Overlay to darken the video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Sign In Form */}
      <div className="relative z-20 p-3 max-w-lg mx-auto bg-white bg-opacity-50 rounded-lg shadow-lg top-20">
        
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg focus:outline-none"
            id="email"
            onChange={handleChange}
          />
          {/* <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg focus:outline-none"
            id="password"
            onChange={handleChange}
          /> */}

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className="flex gap-2 my-6">
          <p>Don't have an account?</p>
          <Link to={'/signup'}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        
        </div>
        {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
      </div>
    </div>
  );
}
