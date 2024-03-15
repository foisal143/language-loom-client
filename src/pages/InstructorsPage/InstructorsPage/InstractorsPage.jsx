import PageBannar from '../../../components/PageBannar/PageBannar';

import Instructors from '../Instructors/Instructors';
import img from '../../../assets/img/instructors.jpg';
const InstractorsPage = () => {
  return (
    <div className="overflow-hidden ">
      <PageBannar
        img={img}
        heading="Our Instructors"
        details="   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
          nesciunt tenetur libero facere ullam ad, consequatur excepturi
          repellat quidem nemo accusamus laudantium possimus facilis
          voluptatibus est? Laboriosam dolorem eius modi."
      ></PageBannar>
      <Instructors />
    </div>
  );
};

export default InstractorsPage;
