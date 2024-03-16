import moment from 'moment';

const PayHistoryRow = ({ item, i }) => {
  const { name, email, transactonId, price, date } = item;
  return (
    <tr>
      <th>{i + 1}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{transactonId}</td>
      <td>{price}</td>

      <td>{moment(date).format('MMM Do YY')}</td>
    </tr>
  );
};

export default PayHistoryRow;
