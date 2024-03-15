import { useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import PopularInsCard from '../../../components/PopularInsCard/PopularInsCard';

const PopularInstractor = () => {
  const [popularInstractor, setPopularInstractor] = useState([]);

  // fetch the data of instractor
  useEffect(() => {
    fetch('http://localhost:5000/instructors')
      .then(res => res.json())
      .then(data => {
        const popular = data.sort((a, b) => {
          return b.student_count - a.student_count;
        });
        setPopularInstractor(popular.slice(0, 6));
      });
  }, []);
  return (
    <Container>
      <Heading heading="Popular Instructors" />
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {popularInstractor && popularInstractor.length > 0
          ? popularInstractor.map(instractor => (
              <PopularInsCard key={instractor._id} instractor={instractor} />
            ))
          : 'NO Istructor found'}
      </div>
    </Container>
  );
};

export default PopularInstractor;
