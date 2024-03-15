import PageBannar from '../../../components/PageBannar/PageBannar';
import Classes from '../Classes/Classes';
import img from '../../../assets/img/classesBannar.jpeg';
const ClassesPage = () => {
  return (
    <div>
      <PageBannar
        img={img}
        heading="Our Classes"
        details="   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
          nesciunt tenetur libero facere ullam ad, consequatur excepturi
          repellat quidem nemo accusamus laudantium possimus facilis
          voluptatibus est? Laboriosam dolorem eius modi."
      ></PageBannar>
      <Classes />
    </div>
  );
};

export default ClassesPage;
