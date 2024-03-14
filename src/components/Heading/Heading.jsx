const Heading = ({ heading }) => {
  return (
    <>
      <h3 className="w-fit mx-auto uppercase text-2xl md:text-4xl font-semibold border-b-2 pb-2 border-blue-500">
        {heading}
      </h3>
    </>
  );
};

export default Heading;
