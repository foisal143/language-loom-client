import { useRef, useState } from 'react';
import useAxiosSeciure from '../../hooks/useAxiosSeciure';
import toast from 'react-hot-toast';

const MyClassRow = ({ i, item, refetch }) => {
  const axiosSecure = useAxiosSeciure();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  // handler update form submit
  const handlerUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const imagefile = form.image.files[0];
    const instructor = form.instructor.value;
    const availableSeats = form.availableSeats.value;
    const price = form.price.value;

    const imageFormFile = new FormData();
    imageFormFile.append('image', imagefile);

    setLoading(true);
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`,
      {
        method: 'POST',
        body: imageFormFile,
      }
    )
      .then(res => res.json())
      .then(imgData => {
        let image = item?.image;
        if (imgData.success) {
          image = imgData.data.url;
        }
        const classInfo = {
          name: name,
          image: image,
          instructor,
          availableSeats: parseInt(availableSeats),
          price: parseFloat(price),
          inrolledStudent: item?.inrolledStudent,
          status: item?.status,
          email: item?.email,
          feedback: item?.feedback,
        };
        axiosSecure.put(`/classes/${item?._id}`, classInfo).then(data => {
          if (data.data.modifiedCount > 0) {
            toast.success('Update success');
            refetch();
            modalRef.current.click();
            setLoading(false);
          }
        });
      });
  };

  // handler delete the denied class
  const handlerDelete = () => {
    axiosSecure.delete(`/classes/${item?._id}`).then(data => {
      if (data.data.deletedCount > 0) {
        toast.success('Class Deleted Success');
        refetch();
      }
    });
  };
  return (
    <tr>
      <th>{i + 1} </th>
      <td>{item?.name}</td>
      <td>{item?.inrolledStudent}</td>
      <td
        className={
          (item?.status === 'allowed' && 'text-green-500') ||
          (item?.status === 'pending' && 'text-yellow-500') ||
          (item?.status === 'denied' && 'text-red-500')
        }
      >
        {item?.status}
      </td>
      <td>{item?.status === 'denied' ? item?.feedback : 'No Feedback'}</td>
      <td>
        {item?.status === 'denied' ? (
          <button onClick={handlerDelete} className="coustom-btn ">
            Delete
          </button>
        ) : (
          <button
            onClick={() => document.getElementById('my_modal_3').showModal()}
            className="coustom-btn"
          >
            Update
          </button>
        )}
      </td>
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
          <h3 className="font-bold text-lg">Update your class!</h3>

          {/* form for update the data */}
          <form onSubmit={handlerUpdate} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="className"
                className="block text-sm font-medium text-gray-700"
              >
                Class name
              </label>
              <input
                type="text"
                defaultValue={item?.name}
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
                defaultValue={item?.instructor}
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
                defaultValue={item?.availableSeats}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
                defaultValue={item?.price}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
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
  );
};

export default MyClassRow;
