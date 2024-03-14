const ReviewCard = ({ review }) => {
  const { name, image, testimonial, details } = review;
  return (
    <div className="space-y-5 px-5 lg:px-12 py-5">
      <div className="flex  justify-between items-center">
        <img src={image} className="w-20 h-20 rounded-full " alt="" />
        <div>
          <h3 className="font-bold text-2xl md:text-3xl ">{name}</h3>
          <p>{details}</p>
        </div>
      </div>
      <p>{testimonial}</p>
    </div>
  );
};

export default ReviewCard;
