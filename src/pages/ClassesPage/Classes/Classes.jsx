import { useContext, useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import ClassCard from '../../../components/ClassCard/ClassCard';
import { AuthContext } from '../../../Authprovaider/Authprovaider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // // handler for select the classes
  // const handlerSelectClass = choseClass => {
  //   if (!user) {
  //     Swal.fire({
  //       title: 'Please Login!',
  //       text: 'You should login first!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Login!',
  //     }).then(result => {
  //       if (result.isConfirmed) {
  //         navigate('/login');
  //       }
  //     });
  //   } else {
  //     const classInfo = {
  //       email: user?.email,
  //       image: choseClass.image,
  //       name: choseClass.name,
  //       price: choseClass.price,
  //       instructor: choseClass.instructorName,
  //     };
  //     setLoading(true);
  //     fetch('http://localhost:5000/selectedClasses', {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify(classInfo),
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.insertedId) {
  //           fetch(`http://localhost:5000/classes/${choseClass._id}`, {
  //             method: 'PATCH',
  //             headers: {
  //               'content-type': 'application/json',
  //             },
  //             body: JSON.stringify({ seats: choseClass.availableSeats - 1 }),
  //           })
  //             .then(res => res.json())
  //             .then(data => {
  //               if (data.modifiedCount > 0) {
  //                 toast.success('Added To Your Selected Page');
  //               }
  //             });
  //           setLoading(false);
  //         }
  //       });
  //   }
  // };
  // fetch the classes data
  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(er => console.log(er.message));
  }, [classes]);
  return (
    <Container>
      <Heading heading="All Classes"></Heading>
      {classes && classes.length > 0 ? (
        <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {classes.map(classItem => (
            <ClassCard
              classItem={classItem}
              key={classItem._id}
              loading={loading}
            />
          ))}
        </div>
      ) : (
        'NO Class Found'
      )}
    </Container>
  );
};

export default Classes;
