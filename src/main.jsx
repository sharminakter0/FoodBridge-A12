import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'
import AuthProvider from './Context/AuthProvider'
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(


  <>
   <Toaster position="top-right" />
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    
    <div className='font-urbanist '>
      <AuthProvider>
        <Elements stripe={stripePromise} >
   <RouterProvider router={router}></RouterProvider>
   </Elements>
   </AuthProvider>
   </div>
   </QueryClientProvider>
  </StrictMode>
  </>
)
