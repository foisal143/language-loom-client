import { useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import { useEffect } from 'react';
import InstructorCard from '../../../components/InstructorCard/InstructorCard';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  // fetch the instructors data
  useEffect(() => {
    fetch('instructors.json')
      .then(res => res.json())
      .then(data => setInstructors(data));
  }, []);
  return (
    <Container>
      <Heading heading="All Instructors"></Heading>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {instructors && instructors.length > 0 ? (
          instructors.map(instructor => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))
        ) : (
          <p>NO Instructros Found</p>
        )}
      </div>
    </Container>
  );
};

export default Instructors;
