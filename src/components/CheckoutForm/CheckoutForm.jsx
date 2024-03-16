import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import useAxiosSeciure from '../../hooks/useAxiosSeciure';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Authprovaider/Authprovaider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ classItem }) => {
  const axiosSeciure = useAxiosSeciure();
  const [secretKey, setSecretKey] = useState('');
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //  fetch the secret key
  useEffect(() => {
    axiosSeciure
      .post('/payment-intent', { price: classItem?.price })
      .then(data => {
        const { clientSecret } = data.data;
        setSecretKey(clientSecret);
      });
  }, [axiosSeciure, classItem]);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // create confirm payment
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      `${secretKey}`,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if (confirmError) {
      console.log('confirm error here', confirmError.message);
    } else {
      const { id } = paymentIntent;
      if (paymentIntent.status === 'succeeded') {
        const enrolledInfo = {
          name: classItem.name,
          price: classItem.price,
          image: classItem.image,
          email: classItem.email,
          instructor: classItem.instructor,
        };

        // post the enrolled data
        axiosSeciure.post('/enrolled-class', enrolledInfo).then(data => {
          if (data.data.insertedId) {
            const paymentInfo = {
              name: user?.displayName,
              email: user?.email,
              transactonId: id,
              price: classItem.price,
              date: new Date(),
            };

            // post the payments data

            axiosSeciure.post('/payments', paymentInfo).then(data => {
              if (data.data.insertedId) {
                // delete the selected class
                axiosSeciure
                  .delete(`/selectedClasses/${classItem._id}`)
                  .then(data => {
                    if (data.data.deletedCount > 0) {
                      // update the avoilable seats
                      axiosSeciure
                        .patch(`/classes/${classItem.id}`)
                        .then(data => {
                          if (data.data.modifiedCount > 0) {
                            toast.success('Payment success');
                            navigate('/dashboard/enrolled-class');
                          }
                        });
                    }
                  });
              }
            });
          }
        });
      }
    }
    setLoading(false);
  };
  return (
    <div className="lg:w-1/2 mx-auto mt-12">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="w-full mx-auto coustom-btn"
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-accent"></span>
          ) : (
            ` Please Pay $${classItem?.price}`
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
