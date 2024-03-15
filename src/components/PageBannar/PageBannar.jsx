const PageBannar = ({ img, heading, details }) => {
  return (
    <div className={` w-full min-h-[70vh]  text-white  relative`}>
      <img src={img} className="absolute top-0 left-0 w-full h-full " alt="" />
      <div className="w-full h-full absolute top-0 left-0 bg-black/50 flex justify-center items-center">
        <div className="w-full lg:w-1/2 mx-auto space-y-5 text-center">
          <h2 className="uppercase font-bold text-4xl lg:text-5xl ">
            {heading}
          </h2>
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
};

export default PageBannar;
