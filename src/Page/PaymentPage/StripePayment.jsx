import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/UseAuth';


const StripePayment = ({ amount, orgInfo, onSuccess }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('https://food-donation-server-mu.vercel.app/create-payment-intent', { amount: amount * 100 })
      .then(res => setClientSecret(res.data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error,paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    else{
      console.log("Payment Method",paymentMethod)
     
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    });

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      toast.success('Payment Successful!');

      const payload = {
        email: user.email,
        name: user.displayName,
        organization: orgInfo.organization,
        mission: orgInfo.mission,
        transactionId: paymentIntent.id,
        amount,
        purpose: 'Charity Role Request',
        status: 'Pending',
        date: new Date()
      };

      await axios.post('https://food-donation-server-mu.vercel.app/charity-requests', payload);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded-md" />
      <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white border-2 mx-auto border-blue-400 w-full hover:shadow-md hover:shadow-blue-600 " disabled={!stripe || !clientSecret}>
        Pay ${amount}
      </button>
    </form>
  );
};

export default StripePayment;
