import { useContext, useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import ClassCard from '../../../components/ClassCard/ClassCard';
import { Link } from 'react-router-dom';

import Heading from '../../../components/Heading/Heading';
import { ThemeContext } from '../../../ThemeProvaider/ThemeProvaider';
const PopularClasses = () => {
  const [popularClass, setPopularClass] = useState([]);
  const { isDark } = useContext(ThemeContext);
  // // handler for select the classes
  // const handlerSelectClass = id => {
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
  //   }
  // };

  // fetch the classes data
  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(res => res.json())
      .then(data => {
        const popularClassSorted = data
          .sort((a, b) => {
            return b.inrolledStudent - a.inrolledStudent;
          })
          .slice(0, 6);
        const popular = popularClassSorted.filter(
          item => item.status === 'allowed'
        );
        setPopularClass(popular);
      });
  }, [popularClass]);

  return (
    <Container>
      <Heading heading=" Popular Classes" />
      {popularClass && popularClass.length > 0 ? (
        <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {popularClass.map(classItem => (
            <ClassCard classItem={classItem} key={classItem._id} />
          ))}
        </div>
      ) : (
        'NO Class Found'
      )}
      <div className="mt-5 text-center">
        <Link to="/classes">
          <button className="coustom-btn">Show More</button>
        </Link>
      </div>
    </Container>
  );
};

export default PopularClasses;
