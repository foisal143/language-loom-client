import { useContext, useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import ClassCard from '../../../components/ClassCard/ClassCard';
import { AuthContext } from '../../../Authprovaider/Authprovaider';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // handler for select the classes
  const handlerSelectClass = id => {
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
    }
  };
  // fetch the classes data
  useEffect(() => {
    fetch('classes.json')
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(er => console.log(er.message));
  }, []);
  return (
    <Container>
      <Heading heading="All Classes"></Heading>
      {classes && classes.length > 0 ? (
        <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {classes.map(classItem => (
            <ClassCard
              handlerSelectClass={handlerSelectClass}
              classItem={classItem}
              key={classItem._id}
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
