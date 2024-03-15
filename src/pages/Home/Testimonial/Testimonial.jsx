import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';
const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  // fetch the reviews data
  useEffect(() => {
    fetch('reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);
  return (
    <Container>
      <Heading heading="student Testimonial"></Heading>
      <div className="border border-dashed my-12 border-black rounded-md">
        <div className="my-12 w-10/12  mx-auto">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {reviews.length > 0 &&
              reviews.map(item => (
                <SwiperSlide key={item.name}>
                  <ReviewCard review={item}></ReviewCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Testimonial;
