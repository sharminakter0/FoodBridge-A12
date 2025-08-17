import React, { useState } from 'react';
import useAuth from '../../../Hooks/UseAuth';
import StripePayment from '../../PaymentPage/StripePayment';


const RequestCharityRole = () => {
  const { user } = useAuth();
  const [orgInfo, setOrgInfo] = useState({ organization: '', mission: '' });
  const [payNow, setPayNow] = useState(false);

  const handleChange = (e) => {
    setOrgInfo({ ...orgInfo, [e.target.name]: e.target.value });
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    if (orgInfo.organization && orgInfo.mission) {
      setPayNow(true);
    }
  };

  const handleSuccess = () => {
    setPayNow(false);
    // Optional: Redirect or show message
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow-md rounded-md border-blue-400 border-1">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      {!payNow ? (
        <form className="space-y-4" onSubmit={handlePayClick}>
          <div>
            <label className="label">User Name</label>
            <input className="input input-bordered w-full" value={user.displayName} readOnly />
          </div>
          <div>
            <label className="label">User Email</label>
            <input className="input input-bordered w-full" value={user.email} readOnly />
          </div>
          <div>
            <label className="label">Organization Name</label>
            <input
              className="input input-bordered w-full"
              name="organization"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label">Mission Statement</label>
            <textarea
              name="mission"
              className="textarea textarea-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white border-2 mx-auto border-blue-400  hover:shadow-md hover:shadow-blue-600 w-full">Pay $25</button>
        </form>
      ) : (
        <StripePayment amount={25} orgInfo={orgInfo} onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default RequestCharityRole;
