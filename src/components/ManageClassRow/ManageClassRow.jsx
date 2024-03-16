const ManageClassRow = ({ item, i }) => {
  const { name, price, instructorName, image, _id, availableSeats } = item;
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
        <select className="select select-bordered" name="action" id="">
          <option value="pending">Pending</option>
          <option value="allowed">Allowed</option>
          <option value="denied">Denie</option>
        </select>
      </td>
      <td>
        <button className="coustom-btn">Send FeedBack</button>
      </td>
    </tr>
  );
};

export default ManageClassRow;
