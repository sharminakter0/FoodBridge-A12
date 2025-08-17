import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; 
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/UseAuth';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [statuses, setStatuses] = useState({}); // Map transactionId => status

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get transaction history
        const trxRes = await axios.get(`https://food-donation-server-mu.vercel.app/transactions/${user.email}`);
        setTransactions(trxRes.data);

        // Get associated charity requests
        const reqRes = await axios.get(`https://food-donation-server-mu.vercel.app/charity-requests/${user.email}`);
        const statusMap = {};
        reqRes.data.forEach(req => {
          statusMap[req.transactionId] = req.status;
        });
        setStatuses(statusMap);
      } catch {
        toast.error('Failed to load transaction history');
      }
    };

    if (user?.email) fetchData();
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={trx._id}>
                  <td>{index + 1}</td>
                  <td className="text-sm break-all">{trx.transactionId}</td>
                  <td>${(trx.amount / 100).toFixed(2)}</td>
                  <td>{moment(trx.date).format('LLL')}</td>
                  <td>
                    <span className={`badge 
                      ${statuses[trx.transactionId] === 'Approved' ? 'badge-success' : 
                        statuses[trx.transactionId] === 'Rejected' ? 'badge-error' : 'badge-warning'}
                    `}>
                      {statuses[trx.transactionId] || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
