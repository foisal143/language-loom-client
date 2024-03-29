import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../Authprovaider/Authprovaider';

const StudentHome = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then(res => res.json())
      .then(data => setUserInfo(data));
  }, [user]);

  return (
    <div className="my-12">
      <div className=" lg:flex justify-center  items-center mt-12">
        <div className="lg:w-1/2 flex text-center flex-col justify-center  space-y-3 items-center  bg-blue-300 h-[400px] rounded-md">
          <h3 className="text-center text-3xl font-bold"> Student</h3>
          <img
            className="w-24 border h-24 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <div>
            <h3 className="text-3xl font-bold">{userInfo?.name}</h3>
            <p>
              <strong>Email:</strong> {userInfo?.email}
            </p>
            <p>
              <strong>Phone Number:</strong>{' '}
              {userInfo?.phoneNumber || 'Not Found'}
            </p>
            <p>
              <strong>Gender:</strong> {userInfo?.gender}
            </p>
            <p>
              <strong>Address:</strong> {userInfo?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
