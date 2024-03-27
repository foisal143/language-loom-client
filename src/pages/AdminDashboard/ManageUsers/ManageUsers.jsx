import toast from 'react-hot-toast';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';
import useUsers from '../../../hooks/useUsers';
import { useState } from 'react';

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  const axiosSecuire = useAxiosSeciure();
  console.log(users);
  const [loading, setLoading] = useState(false);
  // handler function for make admin
  const handlerMakeAdmin = email => {
    setLoading(true);

    const role = { role: 'admin' };
    axiosSecuire
      .patch(`/users/${email}`, role)
      .then(data => {
        if (data.data.modifiedCount > 0) {
          toast.success('Those User is Admin Now');
          refetch();
        }
      })
      .catch(er => console.log(er.message));
    setLoading(false);
  };

  // handler function for make instructor
  const handlerMakeInstructor = email => {
    setLoading(true);
    const role = { role: 'instructor' };
    axiosSecuire
      .patch(`/users/${email}`, role)
      .then(data => {
        if (data.data.modifiedCount > 0) {
          toast.success('Those User is Instructor Now');
          refetch();
        }
      })
      .catch(er => console.log(er.message));
    setLoading(false);
  };

  return (
    <Container>
      <Heading heading="Manage Users"></Heading>

      {users && users.length > 0 ? (
        <div className="mt-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, i) => (
                    <tr key={user._id}>
                      <th>{i + 1}</th>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      <td>{user?.role ? user?.role : 'student'}</td>
                      <td>
                        <button
                          disabled={
                            user?.role === 'admin' ||
                            user?.role === 'instructor' ||
                            loading
                          }
                          onClick={() => handlerMakeAdmin(user?.email)}
                          className={
                            user?.role === 'admin' ||
                            user?.role === 'instructor' ||
                            loading
                              ? ' px-8 py-2 rounded-md bg-gray-300'
                              : 'coustom-btn '
                          }
                        >
                          Make Admin
                        </button>
                      </td>
                      <td>
                        <button
                          disabled={
                            user?.role === 'admin' ||
                            user?.role === 'instructor' ||
                            loading
                          }
                          onClick={() => handlerMakeInstructor(user?.email)}
                          className={
                            user?.role === 'admin' ||
                            user?.role === 'instructor' ||
                            loading
                              ? ' px-8 py-2 rounded-md bg-gray-300'
                              : 'coustom-btn '
                          }
                        >
                          Make Instructor
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-xl mt-12 font-bold text-center"> No Users Found</p>
      )}
    </Container>
  );
};

export default ManageUsers;
