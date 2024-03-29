import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const InstructorCard = ({ instructor }) => {
  const { name, image, email, _id } = instructor;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerSeeClass = email => {
    if (!user) {
      Swal.fire({
        title: 'Please Login!',
        text: 'You should login first!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login!',
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
      navigate(`/instructorClass/${email}`);
    }
  };

  return (
    <div className="p-2 border rounded-md hover:shadow-md relative">
      <div className="h-fit pb-2 mb-10">
        <img className="w-full rounded-md h-[220px]" src={image} alt="" />
        <h3 className="text-3xl font-bold">{name}</h3>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
      <div className="mt-2 absolute bottom-0 left-0 w-full p-2">
        <button
          onClick={() => handlerSeeClass(email)}
          className="coustom-btn w-full"
        >
          See Classes
        </button>
      </div>
    </div>
  );
};

export default InstructorCard;
