import {  useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const RequestedDonations = () => {
  const [requests, setRequests] = useState([]);
  

  useEffect(() => {
    // if (user.email) {
      axios.get(`http://localhost:3000/donation-requests`)
        .then(res => setRequests(res.data))
        .catch(err => console.error(err));
    // }
  }, []);

  const handleStatusChange = async (id, status, donationId) => {
    try {
      const res = await axios.patch(`http://localhost:3000/donation-requests/${id}/status`, {
        status,
        donationId,
      });

      Swal.fire({
        icon: 'success',
        title: `Request ${status}`,
        text: res.data.message || 'Status updated',
      });

      // Update UI
      setRequests(prev =>
        prev.map(req =>
          req._id === id
            ? { ...req, status }
            : req.donationId === donationId && status === 'Accepted'
              ? { ...req, status: 'Rejected' }
              : req
        )
      );
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Requested Donations</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200 text-base font-medium">
            <th>Donation Title</th>
            <th>Food Type</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id} className="hover">
              <td>{req.donationTitle}</td>
              <td>{req.foodType}</td>
              <td>{req.charityName}</td>
              <td>{req.charityEmail}</td>
              <td>{req.
requestDescription}</td>
              <td>{req.pickupTime}</td>
              <td>
                <span className={`badge ${req.status === 'Pending' ? 'badge-warning' : req.status === 'Accepted' ? 'badge-success' : 'badge-error'}`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(req._id, 'Accepted', req.donationId)}
                      className="btn btn-sm btn-success mr-1"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, 'Rejected', req.donationId)}
                      className="btn btn-sm btn-error"
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
  );
};

export default RequestedDonations;
