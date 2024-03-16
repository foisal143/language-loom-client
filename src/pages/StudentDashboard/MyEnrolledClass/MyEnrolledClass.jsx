import Swal from 'sweetalert2';
import Container from '../../../components/Container/Container';
import EnrolledRow from '../../../components/EnrolledRow/EnrolledRow';
import Heading from '../../../components/Heading/Heading';
import SelectClassRow from '../../../components/SelectClassRow/SelectClassRow';
import useEnrolledClass from '../../../hooks/useEnrolledClass';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';

const MyEnrolledClass = () => {
  const [enrolledClass, refetch] = useEnrolledClass();
  const axiosSeciure = useAxiosSeciure();
  const handlerDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSeciure.delete(`/enrolled-class/${id}`).then(data => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your class has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <Container>
      <Heading heading="My Enrolled class"></Heading>
      {enrolledClass && enrolledClass.length > 0 ? (
        <div className="my-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Instructor</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody>
                {enrolledClass.length > 0 &&
                  enrolledClass.map((item, i) => (
                    <EnrolledRow
                      key={item._id}
                      i={i}
                      handlerDelete={handlerDelete}
                      item={item}
                    ></EnrolledRow>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center mt-12 text-2xl font-semibold">
          No Class Enrolled
        </p>
      )}
    </Container>
  );
};

export default MyEnrolledClass;
