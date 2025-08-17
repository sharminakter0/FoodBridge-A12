import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedDonationsPage from '../FeaturedDonations/FeaturedDonationsPage';
import LatestCharityRequests from '../../LatestCharityRequests/LatestCharityRequests';
import ImpactStats from '../../ImpactPage/ImpactStats';
import CommunityStories from '../../CommunityStories/CommunityStories';
import UserStatistics from '../../../Component/Statics/UserStatistics';
import SuccessStoryBanner from '../../../Component/FoodDonationSuccess/SuccessStoryBanner ';

const Home = () => {
    return (
        <div className=" w-11/12 mx-auto">
          <Banner/>
          <ImpactStats></ImpactStats>
          <FeaturedDonationsPage></FeaturedDonationsPage>

          <LatestCharityRequests></LatestCharityRequests>
          <SuccessStoryBanner></SuccessStoryBanner>
          <UserStatistics></UserStatistics>
          
          <CommunityStories></CommunityStories>
          
        </div>
    );
};

export default Home;