import { FaRegTrashAlt } from 'react-icons/fa';

const EnrolledRow = ({ i, item, handlerDelete }) => {
  const { name, price, instructor, image, _id } = item;
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
      <td>{instructor}</td>
      <td>{price}</td>
      <td>
        <button
          onClick={() => handlerDelete(_id)}
          className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-white text-xl"
        >
          <FaRegTrashAlt />
        </button>
      </td>
      <td>
        {' '}
        <button className="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center text-white ">
          Done
        </button>
      </td>
    </tr>
  );
};

export default EnrolledRow;
