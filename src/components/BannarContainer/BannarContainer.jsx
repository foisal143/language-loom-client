const BannarContainer = ({ img, heading, details }) => {
  return (
    <div className="h-[calc(100vh-80px)]  relative">
      <img src={img} className="w-full h-full " alt="" />
      <div className="absolute flex justify-center items-center top-0  left-0 w-full h-full bg-black/50">
        <div className="w-full space-y-5 px-5 text-white lg:px-12  text-center lg:w-1/2 lg:mx-auto">
          <h2 className="text-6xl uppercase">{heading}</h2>
          <p>{details}</p>
          <button className="coustom-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default BannarContainer;
