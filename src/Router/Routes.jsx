import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Page/Home/Home/Home";
import AllDonation from "../Page/All Donation/AllDonations.jsx";

import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Page/Authentication/Login/Login";
import Register from "../Page/Authentication/Register/Register";
import PrivateRouter from "../Hooks/PrivateRouter"
import DashboardLayout from "../Page/Dashboard/DashboardLayout/DashboardLayout";
// import  MyProfile from "../Page/Dashboard/UserDashboard/MyProfile"
import RequestCharityRole from "../Page/Dashboard/UserDashboard/RequestCharityRole";
import Favorites from "../Page/Dashboard/UserDashboard/Favorites";
import MyReviews from "../Page/Dashboard/UserDashboard/MyReviews";
import TransactionHistory from "../Page/Dashboard/UserDashboard/TransactionHistory";
import AddDonation from "../Page/Dashboard/RestaurentDB/AddDonation";
import MyDonations from "../Page/Dashboard/RestaurentDB/MyDonations";
import UpdateDonationForm from "../Page/Dashboard/RestaurentDB/UpdateDonationForm/UpdateDonationForm";
import RequestedDonations from "../Page/Dashboard/RestaurentDB/RequestedDonations";
import MyRequests from "../Page/Dashboard/DashboardCharity/MyRequests";
import MyPickups from "../Page/Dashboard/DashboardCharity/MyPickups";
import ReceivedDonations from "../Page/Dashboard/DashboardCharity/ReceivedDonations";
import ManageDonations from "../Page/Dashboard/DashboardAdmin/ManageDonations";
import ManageUsers from "../Page/Dashboard/DashboardAdmin/ManageUsers";
import ManageRoleRequests from "../Page/Dashboard/DashboardAdmin/ManageRoleRequests";
import ManageRequests from "../Page/Dashboard/DashboardAdmin/ManageRequests";
import FeatureDonations from "../Page/Dashboard/DashboardAdmin/FeatureDonations.jsx";
import DonationDetails from "../Page/DonationDetailsPage/DonationDetails.jsx";
import AboutPage from "../Page/AboutPage/AboutPage.jsx";
import ContactPage from "../Page/ContactPage/ContactPage.jsx";
import ErrorPage from "../Page/ErrorPage/ErrorPage.jsx";
import DonationStatistics from "../Page/Dashboard/RestaurentDB/DonationStatistics/DonationStatistics.jsx";
import MyProfile from "../Component/MyProfile.jsx";






export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
         {
            path:"/all-donation",
            element:<AllDonation></AllDonation> 
        },

        {
          path:"/about",
          element:<AboutPage></AboutPage>
        },
        {
          path:"/contact",
          element:<ContactPage></ContactPage>
        },

         {
    
          path:"/donations/:id",
          element:<PrivateRouter><DonationDetails></DonationDetails></PrivateRouter>
        
  },
  {
    path:"/my-profile",
    element:<MyProfile></MyProfile>
  }
        
     
       
      
    ]

  },

  // {
    
  //         path:"/donations/:id",
  //         element:<PrivateRouter><DonationDetails></DonationDetails></PrivateRouter>
        
  // },


  
   {
    path:"*",
    element:<ErrorPage></ErrorPage>
  },
  {
    path:"/dashboard",
    element: <PrivateRouter> <DashboardLayout></DashboardLayout></PrivateRouter>,
    children:[

      // {
      //   index:true,
      //   element:<MyProfile/>
      // },
      // {
      //   path:"my-profile",
      //   element:<MyProfile></MyProfile>
      // },
      //  routes for User
        {
        index:true,
        element:<DonationStatistics></DonationStatistics>
      },
      {
        path:"/dashboard/request-charity-role",
        element:<RequestCharityRole></RequestCharityRole>
      },

      {
        path:"/dashboard/favorites",
        element:<Favorites></Favorites>
      },

      {
        path:"/dashboard/my-reviews",
        element:<MyReviews></MyReviews>
      },

      {
        path:"/dashboard/transaction-history",
        element:<TransactionHistory></TransactionHistory>
      },


      // Routes for Restaurent

      // {
      //   index:true,
      //   element:<DonationStatistics></DonationStatistics>
      // },

      {
        path:"/dashboard/donation-statistics",
        element:<DonationStatistics></DonationStatistics>
      },
      {
        path:"/dashboard/add-donation",
        element:<AddDonation></AddDonation>
      },
      {
        path:"/dashboard/my-donations",
        element:<MyDonations></MyDonations>
      },
      {
        path:"/dashboard/update-donation/:id",
        element:<UpdateDonationForm></UpdateDonationForm>
      },
      {
        path:"/dashboard/requested-donations",
        element:<RequestedDonations></RequestedDonations>
      },


      // Charity Role

      // {
      //   index:true,
      //   element:<MyRequests></MyRequests>
      // }
,
      {
        path:"/dashboard/my-requests",
        element:<MyRequests></MyRequests>
      },
      {
        path:"/dashboard/my-pickups",
        element:<MyPickups></MyPickups>
      },

      {
        path:"/dashboard/received-donation",
        element:<ReceivedDonations></ReceivedDonations>
      },



      // Admin Role

      // {
      //   index:true,
      //   element:<ManageDonations></ManageDonations>
      // },


      {
        path:"/dashboard/manage-donations",
        element:<ManageDonations></ManageDonations>
      },
      {
        path:"/dashboard/manage-users",
        element:<ManageUsers></ManageUsers>
      },
     {
      path:"/dashboard/manage-role-requests",
      element:<ManageRoleRequests></ManageRoleRequests>
     },

     {
      path:"/dashboard/manage-requests",
      element:<ManageRequests></ManageRequests>
     },

     {
      path:"/dashboard/feature-donations",
      element:<FeatureDonations></FeatureDonations>
     }
    ]

  },
      

  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'/login',
        Component:Login

       },
       {
        path:"/register",
        Component:Register
       }
  ]
  
  }
 


]);