import { useForm } from 'react-hook-form';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Authprovaider/Authprovaider';
import useAxiosSeciure from '../../../hooks/useAxiosSeciure';
import toast from 'react-hot-toast';

const AddClassPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSeciure();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const imageFile = data.classImage[0];

    data.instructorName = user?.displayName;
    const imageFormFile = new FormData();
    imageFormFile.append('image', imageFile);

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
        console.log(imgData);
        if (imgData.success) {
          const img = imgData.data.url;
          console.log('i am from image');
          const classInfo = {
            name: data.className,
            image: img,
            price: parseFloat(data.price),
            availableSeats: parseInt(data.availableSeats),
            status: 'pending',
            inrolledStudent: 0,
            instructor: user?.displayName,
            email: user?.email,
            date: new Date(),
          };
          axiosSecure.post('/classes', classInfo).then(data => {
            if (data.data.insertedId) {
              toast.success('Class Added Successfull');
            }
          });
        }
        setLoading(false);
      });
    console.log(data);
  };
  return (
    <Container>
      <Heading heading="Add Class"></Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto mt-12"
      >
        <div className="mb-4">
          <label
            htmlFor="className"
            className="block text-sm font-medium text-gray-700"
          >
            Class name
          </label>
          <input
            type="text"
            id="className"
            placeholder="Enter the class name"
            {...register('className', { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.className && (
            <span className="text-red-500 text-sm">Class name is required</span>
          )}
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
            {...register('classImage', { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.classImage && (
            <span className="text-red-500 text-sm">
              Class image is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Instructor name
          </label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
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
            id="availableSeats"
            placeholder="Enter the available seats for student"
            {...register('availableSeats', { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.availableSeats && (
            <span className="text-red-500 text-sm">
              Available seats is required
            </span>
          )}
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
            id="price"
            placeholder="Enter price of Class"
            {...register('price', { required: true })}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>
        <div className="mb-4">
          <button disabled={loading} className="coustom-btn w-full">
            {loading ? (
              <span className="loading loading-spinner text-accent"></span>
            ) : (
              'Add'
            )}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default AddClassPage;
