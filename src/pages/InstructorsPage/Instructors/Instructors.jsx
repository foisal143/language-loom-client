import { useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import { useEffect } from 'react';
import InstructorCard from '../../../components/InstructorCard/InstructorCard';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosSecure = useAxiosSeciure();
  // fetch the instructors data
  useEffect(() => {
    axiosSecure.get('/users').then(data => {
      const users = data.data;
      const insta = users.filter(user => user?.role === 'instructor');
      setInstructors(insta);
    });
  }, []);
  return (
    <Container>
      <Heading heading="All Instructors"></Heading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {instructors && instructors.length > 0 ? (
          instructors.map(instructor => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))
        ) : (
          <p>NO Instructros Found</p>
        )}
      </div>
    </Container>
  );
};

export default Instructors;
