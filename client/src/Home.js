import React, { useEffect } from "react";
import FundraiserCard from './FundraiserCard';
const Home = () => {
  useEffect(() => {}, []);
  
   const displayFundraisers = () => {
        return funds.map( (fundraiser) => {
            return (
               <FundraiserCard fundraiser={fundraiser} key={fundraiser}/>
            );
        });
    }
    
  return (
      <div className="main-container">
        {displayFundraisers()}
      </div>
   ) }

export default Home;