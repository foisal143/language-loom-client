import { useContext } from 'react';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAdminOrInstructor from '../../hooks/useAdminOrInstructor';

const SocialLogin = () => {
  const [, refetch] = useAdminOrInstructor();
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlerGoogleLogin = () => {
    googleLogin()
      .then(result => {
        const loggedUser = result.user;

        const userInfo = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
          phoneNumber: loggedUser?.phoneNumber,
          gender: 'not found',
          address: 'not found',
        };
        fetch(`http://localhost:5000/users/${loggedUser?.email}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        })
          .then(res => res.json())
          .then(data => {
            if (data.upsertedCount > 0 || data.matchedCount > 0) {
              toast.success('Login success');
              refetch();
            }
          });
        navigate('/');
      })
      .catch(er => console.log(er.message));
  };
  return (
    <div>
      <button
        type="button"
        onClick={handlerGoogleLogin}
        className="w-full bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 focus:outline-none"
      >
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
