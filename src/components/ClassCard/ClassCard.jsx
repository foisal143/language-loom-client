import { useContext, useState } from 'react';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import toast from 'react-hot-toast';

const ClassCard = ({ classItem }) => {
  const { _id, name, instructorName, availableSeats, isPopular, price, image } =
    classItem;
  const { user } = useContext(AuthContext);
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
        image: choseClass.image,
        name: choseClass.name,
        price: choseClass.price,
        instructor: choseClass.instructorName,
      };
      setLoading(true);
      fetch('http://localhost:5000/selectedClasses', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(classInfo),
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
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
          <strong>Instructor:</strong> {instructorName}
        </p>
        <p>
          <strong>Available sets:</strong> {availableSeats}
        </p>
        <div className="w-fit uppercase text-white font-bold px-5 py-2 rounded-l-md bg-red-500 absolute top-0 right-2">
          ${price}
        </div>

        <div className="text-center">
          <button
            disabled={availableSeats === 0 || loading}
            onClick={() => handlerSelectClass(classItem)}
            className={` absolute bottom-[6px] left-[6px]  w-[95%] mx-auto ${
              availableSeats === 0
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

// decreased the available seats featch

//  fetch(`http://localhost:5000/classes/${choseClass._id}`, {
//    method: 'PATCH',
//    headers: {
//      'content-type': 'application/json',
//    },
//    body: JSON.stringify({ seats: choseClass.availableSeats - 1 }),
//  })
//    .then(res => res.json())
//    .then(data => {
//      if (data.modifiedCount > 0) {
//        toast.success('Added To Your Selected Page');
//      }
//    });
