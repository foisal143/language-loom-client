import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import useClasses from '../../../hooks/useClasses';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';

const MyClass = () => {
  const [classes, refetch] = useClasses();
  const axiosSecure = useAxiosSeciure();

  const [loading, setLoading] = useState(false);

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
              classes.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1} </th>
                  <td>{item?.name}</td>
                  <td>{item?.inrolledStudent}</td>
                  <td
                    className={
                      (item.status === 'allowed' && 'text-green-500') ||
                      (item.status === 'pending' && 'text-yellow-500') ||
                      (item.status === 'denied' && 'text-red-500')
                    }
                  >
                    {item?.status}
                  </td>
                  <td>
                    {item?.status === 'denied' ? item?.feedback : 'No Feedback'}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        document.getElementById('my_modal_3').showModal()
                      }
                      className="coustom-btn"
                    >
                      Update
                    </button>
                  </td>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">Update your class!</h3>
                      <form className="max-w-lg mx-auto">
                        <div className="mb-4">
                          <label
                            htmlFor="className"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Class name
                          </label>
                          <input
                            type="text"
                            value={item?.name}
                            name="name"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="classImage"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Class Image
                          </label>
                          <input
                            type="file"
                            id="classImage"
                            name="image"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Instructor name
                          </label>
                          <input
                            type="text"
                            name="instructor"
                            value={item?.instructor}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="availableSeats"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Available seats
                          </label>
                          <input
                            type="number"
                            name="availableSeats"
                            value={item?.availableSeats}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={item?.price}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="coustom-btn w-full"
                          >
                            {loading ? (
                              <span className="loading loading-spinner text-accent"></span>
                            ) : (
                              'Update'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </tr>
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
