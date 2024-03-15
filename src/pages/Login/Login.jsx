import { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authprovaider/Authprovaider';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { googleLogin, loginEmailPass } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handlerFormSubmit = e => {
    setLoader(true);
    setError('');
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginEmailPass(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setLoader(false);
        navigate('/');
      })
      .catch(er => {
        setLoader(false);
        setError(er.message);
      });
  };

  const handlerGoogleLogin = () => {
    setError('');
    googleLogin()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate('/');
      })
      .catch(er => setError(er.message));
  };

  return (
    <div className="h-[calc(100vh-80px)] px-5  flex justify-center items-center">
      <div className="lg:w-[30vw] w-full mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md">
        <form onSubmit={handlerFormSubmit}>
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-3 text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div className="text-center mb-5">
            <p className="label-text">
              Do not have an account? Please{' '}
              <Link to="/registar">
                <span className="text-blue-500">Registar</span>
              </Link>
            </p>
          </div>
          <div className="mb-4">
            <button disabled={loader} className="w-full coustom-btn">
              {loader ? (
                <span className="loading loading-spinner text-accent"></span>
              ) : (
                'Login'
              )}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handlerGoogleLogin}
              className="w-full bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Login with Google
            </button>
          </div>
          <p className="text-error label-text my-2 text-xs">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
