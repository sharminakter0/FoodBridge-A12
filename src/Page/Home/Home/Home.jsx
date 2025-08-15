import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedDonationsPage from '../FeaturedDonations/FeaturedDonationsPage';
import LatestCharityRequests from '../../LatestCharityRequests/LatestCharityRequests';
import ImpactStats from '../../ImpactPage/ImpactStats';
import CommunityStories from '../../CommunityStories/CommunityStories';

const Home = () => {
    return (
        <div>
          <Banner/>
          <FeaturedDonationsPage></FeaturedDonationsPage>
          <LatestCharityRequests></LatestCharityRequests>
          <ImpactStats></ImpactStats>
          <CommunityStories></CommunityStories>
          
        </div>
    );
};

export default Home;