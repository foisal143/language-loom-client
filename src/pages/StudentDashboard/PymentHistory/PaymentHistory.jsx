import Container from '../../../components/Container/Container';
import EnrolledRow from '../../../components/EnrolledRow/EnrolledRow';
import Heading from '../../../components/Heading/Heading';
import PayHistoryRow from '../../../components/PayHistoryRow/PayHistoryRow';

import usePayments from '../../../hooks/usePayments';

const PaymentHistory = () => {
  const [payments, refetch] = usePayments();
  const sortedPayments =
    payments &&
    payments.sort((a, b) => {
      return a.date - b.date;
    });
  return (
    <Container>
      <Heading heading="Payment History" />
      {payments && payments.length > 0 ? (
        <div className="my-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Transaction Id</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 &&
                  sortedPayments.map((item, i) => (
                    <PayHistoryRow
                      i={i}
                      key={item._id}
                      item={item}
                    ></PayHistoryRow>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-2xl font-semibold text-center mt-12">
          No Payment Here
        </p>
      )}
    </Container>
  );
};

export default PaymentHistory;
