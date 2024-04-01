import { useContext, useState } from 'react';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import toast from 'react-hot-toast';
import useAdmin from '../../hooks/useAdmin';
import useAxiosSeciure from '../../hooks/useAxiosSeciure';

const ClassCard = ({ classItem }) => {
  const {
    name,
    instructor,
    availableSeats,
    price,
    image,
    inrolledStudent,
    email,
  } = classItem;
  const axiosSecuire = useAxiosSeciure();
  const { user } = useContext(AuthContext);
  const isAdmin = useAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handlerSelectClass = choseClass => {
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
      const classInfo = {
        email: user?.email,
        image: choseClass?.image,
        name: choseClass?.name,
        price: choseClass?.price,
        id: choseClass?._id,
        instructor: choseClass?.instructor,
        availableSeats,
        inrolledStudent,
      };
      setLoading(true);
      axiosSecuire.post('/selectedClasses', classInfo).then(data => {
        if (data.data.insertedId) {
          toast.success('Added To Your Selected Page');
          setLoading(false);
        }
      });
    }
  };
  return (
    <div
      className={`w-full group lg:h-[350px] hover:shadow-md duration-200 rounded-md relative border p-2  ${
        availableSeats === 0 && 'border-red-500 border-2'
      }`}
    >
      <div className="relative overflow-hidden">
        <img className="w-full  rounded-md h-[180px]" src={image} alt="" />
        <div className="absolute rounded-md  group-hover:left-0  transition-all duration-200 w-full h-full top-0 -left-[500px] bg-black/75"></div>
      </div>
      <div className="space-y-2 mt-3">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p>
          {' '}
          <strong>Instructor:</strong> {instructor}
        </p>
        <p>
          <strong>Available sets:</strong> {availableSeats}
        </p>
        <div className="w-fit uppercase text-white font-bold px-5 py-2 rounded-l-md bg-red-500 absolute top-0 right-2">
          ${price}
        </div>

        <div className="text-center">
          <button
            disabled={
              availableSeats === 0 ||
              loading ||
              isAdmin ||
              user?.email === email
            }
            onClick={() => handlerSelectClass(classItem)}
            className={` absolute bottom-[6px] left-[6px]  w-[95%] mx-auto ${
              availableSeats === 0 ||
              loading ||
              isAdmin ||
              user?.email === email
                ? 'bg-gray-400 px-8 py-2 rounded-md'
                : 'coustom-btn'
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
