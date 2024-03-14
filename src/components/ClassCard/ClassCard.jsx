const ClassCard = ({ classItem, handlerSelectClass }) => {
  const { _id, name, instructorName, availableSeats, isPopular, price, image } =
    classItem;
  return (
    <div className="w-full group min-h-[300px] hover:shadow-md duration-200 rounded-md relative border p-2 ">
      <div className="relative overflow-hidden">
        <img className="w-full  rounded-md h-[180px]" src={image} alt="" />
        <div className="absolute rounded-md  group-hover:left-0  transition-all duration-200 w-full h-full top-0 -left-96 bg-black/75"></div>
      </div>
      <div className="space-y-2 mt-3">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p>
          {' '}
          <strong>Instructor:</strong> {instructorName}
        </p>
        <p>
          <strong>Available sets:</strong> {availableSeats}
        </p>
        <div className="w-fit uppercase text-white font-bold px-5 py-2 rounded-l-md bg-red-500 absolute top-0 right-2">
          ${price}
        </div>

        <div className="text-center">
          <button
            onClick={() => handlerSelectClass(_id)}
            className="coustom-btn absolute bottom-[6px] left-[6px]  w-[95%] mx-auto "
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
