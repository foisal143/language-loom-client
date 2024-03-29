import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import useClasses from '../../../hooks/useClasses';

import MyClassRow from '../../../components/MyClassRow/MyClassRow';
import { useEffect, useState } from 'react';

const MyClass = () => {
  const [classes, refetch] = useClasses();
  const [sortedClass, setSortedClass] = useState([]);

  useEffect(() => {
    if (classes) {
      const sorted = classes.sort((a, b) => {
        return b?.date - a?.date;
      });
      setSortedClass(sorted);
    } else {
      setSortedClass([]);
    }
  }, [classes]);
  return (
    <Container>
      <Heading heading="My Class" />

      <div className="overflow-x-auto mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Inrolled Student</th>
              <th> Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes &&
              classes.length > 0 &&
              sortedClass.map((item, i) => (
                <MyClassRow
                  item={item}
                  refetch={refetch}
                  key={item._id}
                  i={i}
                />
              ))}
          </tbody>
        </table>

        {/* update modal here */}
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
      </div>
    </Container>
  );
};

export default MyClass;
