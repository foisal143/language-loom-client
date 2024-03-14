import Bannar from '../Bannar/Bannar';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstractor from '../PopularInstractor/PopularInstractor';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
  return (
    <div>
      <Bannar />
      <PopularClasses />
      <PopularInstractor />
      <Testimonial />
    </div>
  );
};

export default Home;
