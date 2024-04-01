import toast from 'react-hot-toast';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import ManageClassRow from '../../../components/ManageClassRow/ManageClassRow';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';
import useClasses from '../../../hooks/useClasses';

const ManagesClasses = () => {
  const [classes, refetch] = useClasses();
  const axiosSeciure = useAxiosSeciure();

  // handler send feedback
  const handlerFeedBack = async (e, id) => {
    e.preventDefault();

    const feedback = e.target.feedback.value;
    console.log(feedback, id);
    try {
      const data = await axiosSeciure.patch(`/feedback/${id}`, {
        feedback: feedback,
      });

      if (data.data.modifiedCount > 0) {
        toast.success('feedback changed');
        refetch();
      }
    } catch (er) {
      console.log(er.message);
    }
  };

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
                        handlerFeedBack={handlerFeedBack}
                        key={item._id}
                        i={i}
                        item={item}
                        refetch={refetch}
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
