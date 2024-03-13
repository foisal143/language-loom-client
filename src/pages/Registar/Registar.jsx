import { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import toast from 'react-hot-toast';

const Registar = () => {
  const { signUpEmailPass, profileUpdate } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlerFromSubmit = e => {
    setLoader(true);
    setError('');
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPass.value;
    const image = form.image.value;
    const phoneNumber = form.phoneNumber.value;

    const userInfo = {
      name,
      email,
      password,
      image,
      phoneNumber,
    };

    // password validation

    if (password !== confirmPassword) {
      setError('password not match');
      return;
    } else if (password.length <= 6) {
      setError('Password length should min 6 ');
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setError('Password should At least one upparcase');
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError('Password should At least one lowercase');
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError('Password should At least one digit');
    } else if (
      !/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)
    ) {
      setError('Password should be one special charecter');
      return;
    } else {
      console.log(userInfo);
      signUpEmailPass(email, password)
        .then(result => {
          const loggedUser = result.user;
          console.log(loggedUser);
          profileUpdate(loggedUser, name, image).then(() => {
            toast.success('Registation success');
            navigate('/login');
            setLoader(false);
          });
        })
        .catch(er => {
          setError(er.message);
          setLoader(false);
        });
    }
  };

  return (
    <div className="lg:max-w-[50vw] mb-12 mx-auto mt-8 p-4 bg-gray-100 rounded shadow-md">
      <form onSubmit={handlerFromSubmit}>
        <h2 className="text-xl font-semibold mb-4">Registration</h2>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                required
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPass"
                placeholder="Enter Confirm Password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-0 right-0 h-full px-3 text-gray-600 focus:outline-none"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="photoURL"
              className="block text-gray-700 font-medium mb-2"
            >
              Photo URL
            </label>
            <input
              required
              type="text"
              id="photoURL"
              name="image"
              placeholder="Enter image url"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-2"
            >
              Gender
            </label>
            <select
              required
              id="gender"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              required
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Address
            </label>
            <textarea
              required
              id="address"
              name="address"
              placeholder="Enter address"
              className="w-full  px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="label-text">
            Already have an account? Please{' '}
            <Link to="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </p>
        </div>

        <div className="my-4">
          <button
            disabled={loader}
            className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            {loader ? (
              <span className="loading loading-spinner text-accent"></span>
            ) : (
              'Register'
            )}
          </button>
        </div>
        <div>
          <button className="w-full bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 focus:outline-none">
            Login with Google
          </button>
        </div>
      </form>
      <p className="text-error my-2">{error}</p>
    </div>
  );
};

export default Registar;
