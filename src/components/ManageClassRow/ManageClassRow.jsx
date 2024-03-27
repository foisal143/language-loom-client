import { useRef, useState } from 'react';
import useAxiosSeciure from '../../hooks/useAxiosSeciure';
import toast from 'react-hot-toast';

const ManageClassRow = ({ item, i, refetch }) => {
  const modalRef = useRef();
  const openModalRef = useRef();
  // todo: admin status and feedback are not functional
  const axiosSeciure = useAxiosSeciure();
  const { name, price, instructorName, image, _id, availableSeats, status } =
    item;
  const [value, setValue] = useState(status);

  // handler status change
  const handlerStatusChange = e => {
    const status = e.target.value;
    setValue(e.target.value);
    axiosSeciure
      .patch(`/classes/${_id}`, {
        status: status,
        feedback: null,
        inrolled: null,
      })
      .then(data => {
        if (data.data.modifiedCount > 0) {
          toast.success('Status Updated');
          if (status === 'denied') {
            openModalRef.current.click();
          }
          refetch();
        }
      });
  };

  // handler send feedback
  const handlerFeedBack = e => {
    e.preventDefault();

    const feedbackValue = e.target.feedback.value;
    const feedback = status === 'denied' ? feedbackValue : '';
    console.log(feedback);
    axiosSeciure
      .patch(`/classes/${_id}`, {
        feedback: feedback,
        status: null,
        inrolled: null,
      })
      .then(data => {
        console.log(data);
        if (data.data.modifiedCount > 0) {
          toast.success('Feddback send');
          modalRef.current.click();
          refetch();
        }
      });
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{instructorName}</td>
      <td>{instructorName}</td>
      <td>{price}</td>
      <td>{availableSeats}</td>
      <td>
        <select
          onChange={handlerStatusChange}
          className={`select select-bordered ${
            (value === 'pending' && 'text-blue-500 border-blue-500') ||
            (value === 'allowed' && 'text-green-500 border-green-500') ||
            (value === 'denied' && 'text-red-500 border-red-500')
          }`}
          name="action"
          id=""
          value={item?.status}
        >
          <option value="pending">Pending</option>
          <option value="allowed">Allowed</option>
          <option value="denied">Denied</option>
        </select>
      </td>
      <td>
        <button
          ref={openModalRef}
          onClick={() => document.getElementById('my_modal_3').showModal()}
          className="coustom-btn"
        >
          Send FeedBack
        </button>
      </td>
      {/* modal here */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              ref={modalRef}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Write a feedback!</h3>
          <div>
            <form onSubmit={handlerFeedBack} className="mt-5" action="">
              <textarea
                className="block w-full textarea textarea-primary"
                name="feedback"
                id=""
                rows="5"
                placeholder="write something why this class selected for denied"
              ></textarea>
              <button type="submit" className="coustom-btn mt-5">
                Send
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </tr>
  );
};

export default ManageClassRow;
