import { useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import ClassCard from '../../../components/ClassCard/ClassCard';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  // fetch the classes data
  useEffect(() => {
    fetch('http://localhost:5000/classes')
      .then(res => res.json())
      .then(data => {
        const allowedData = data.filter(item => item.status === 'allowed');
        setClasses(allowedData);
      })
      .catch(er => console.log(er.message));
  }, [classes]);
  return (
    <Container>
      <Heading heading="All Classes"></Heading>
      {classes && classes.length > 0 ? (
        <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {classes.map(classItem => (
            <ClassCard classItem={classItem} key={classItem._id} />
          ))}
        </div>
      ) : (
        'NO Class Found'
      )}
    </Container>
  );
};

export default Classes;
