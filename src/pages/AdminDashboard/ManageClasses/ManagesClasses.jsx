import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import ManageClassRow from '../../../components/ManageClassRow/ManageClassRow';
import SelectClassRow from '../../../components/SelectClassRow/SelectClassRow';
import useClasses from '../../../hooks/useClasses';

const ManagesClasses = () => {
  const [classes, refetch] = useClasses();

  return (
    <Container>
      <Heading heading="Manage Classes" />
      <div className="mt-12">
        {classes && classes.length > 0 ? (
          <div className="my-12">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Instructor Name</th>
                    <th>Instructor Email</th>
                    <th>Available Seats</th>
                    <th>Price</th>
                    <th>Action</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {classes &&
                    classes.length > 0 &&
                    classes.map((item, i) => (
                      <ManageClassRow
                        refetch={refetch}
                        key={item._id}
                        i={i}
                        item={item}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center mt-12 text-2xl font-semibold">
            No Class Selected
          </p>
        )}
      </div>
    </Container>
  );
};

export default ManagesClasses;
