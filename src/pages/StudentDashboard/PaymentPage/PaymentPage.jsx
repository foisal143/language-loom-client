import { Elements } from '@stripe/react-stripe-js';
import Container from '../../../components/Container/Container';
import Heading from '../../../components/Heading/Heading';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../../components/CheckoutForm/CheckoutForm';
import { useLoaderData } from 'react-router-dom';

const PaymentPage = () => {
  const classItem = useLoaderData();

  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUB_KEY}`);
  return (
    <Container>
      <Heading heading="Payment"></Heading>
      <Elements stripe={stripePromise}>
        <CheckoutForm classItem={classItem} />
      </Elements>
    </Container>
  );
};

export default PaymentPage;
