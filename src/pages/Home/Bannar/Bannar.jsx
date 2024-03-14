import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BannarContainer from '../../../components/BannarContainer/BannarContainer';
import img1 from '../../../assets/img/img1.jpeg';
import img2 from '../../../assets/img/img2.jpg';
import img3 from '../../../assets/img/img3.jpg';
import img4 from '../../../assets/img/img4.png';
const Bannar = () => {
  return (
    <div className="flex mb-12  justify-center items-center h-[calc(100vh-80px)]">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper w-full"
      >
        <SwiperSlide>
          <BannarContainer
            img={img1}
            heading="learn this"
            details="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, tempore ipsum cupiditate laudantium harum nihil! Ipsam et vitae, quasi est, blanditiis expedita non, fugiat pariatur unde commodi tempore labore necessitatibus."
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannarContainer
            img={img2}
            heading="learn this"
            details="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, tempore ipsum cupiditate laudantium harum nihil! Ipsam et vitae, quasi est, blanditiis expedita non, fugiat pariatur unde commodi tempore labore necessitatibus."
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannarContainer
            img={img3}
            heading="learn this"
            details="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, tempore ipsum cupiditate laudantium harum nihil! Ipsam et vitae, quasi est, blanditiis expedita non, fugiat pariatur unde commodi tempore labore necessitatibus."
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannarContainer
            img={img4}
            heading="learn this"
            details="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, tempore ipsum cupiditate laudantium harum nihil! Ipsam et vitae, quasi est, blanditiis expedita non, fugiat pariatur unde commodi tempore labore necessitatibus."
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Bannar;
