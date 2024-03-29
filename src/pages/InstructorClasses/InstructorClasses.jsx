import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Heading from '../../components/Heading/Heading';
import ClassCard from '../../components/ClassCard/ClassCard';

const InstructorClasses = () => {
  const allClasses = useLoaderData();
  const [classes, setClasses] = useState([]);

  // load the allowed data

  useEffect(() => {
    const allowedClass = allClasses.filter(item => item?.status === 'allowed');
    setClasses(allowedClass);
  }, [allClasses]);
  console.log(classes);
  return (
    <Container>
      <Heading heading="Classes"></Heading>
      {classes && classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-12">
          {classes.map(item => (
            <ClassCard classItem={item} key={item._id}></ClassCard>
          ))}
        </div>
      ) : (
        <p className="text-3xl font-bold text-center">
          No Class here for this Instructor
        </p>
      )}
    </Container>
  );
};

export default InstructorClasses;
