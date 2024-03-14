const PopularInsCard = ({ instractor }) => {
  const { name, image, classes_names } = instractor;
  return (
    <div className="p-2 border rounded-md hover:shadow-md">
      <img className="w-full rounded-md h-[220px]" src={image} alt="" />
      <h3 className="text-3xl font-bold">{name}</h3>
      <ul className="list-disc relative left-5">
        {classes_names && classes_names.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default PopularInsCard;
