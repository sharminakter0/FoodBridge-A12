import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/charity-role-requests`)
      .then(res => {
      console.log('Fetched requests:', res.data); // 🔍 Check this
      setRequests(res.data);
    })
      .catch(err => {
      console.error('Error loading requests:', err); // 🔍 Check this
      toast.error('Failed to load role requests');
    });
}, []);

  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:3000/admin/role-requests/${id}`, { action });
      toast.success(`Request ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      setRequests(prev => prev.filter(r => r._id !== id)); // Remove handled request
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update request');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Role Requests</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.organization}</td>
                <td>{req.mission}</td>
                <td>{req.transactionId}</td>
                <td>
                  <span
                    className={`font-semibold ${
                      req.status === 'Pending' ? 'text-yellow-600' :
                      req.status === 'Approved' ? 'text-green-600' :
                      'text-red-600'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, 'approve')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, 'reject')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;
