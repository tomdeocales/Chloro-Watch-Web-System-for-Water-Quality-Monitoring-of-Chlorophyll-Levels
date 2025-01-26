import React, { useEffect } from 'react';

function AboutChloroWatch() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "Chloro Watch | About Chloro Watch";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Banner section */}
      <div className='banner CholoroWatch'>
        <div className='banner-title'>
          <h1>About Chloro Watch</h1>
          <span>What is Choloro Watch?</span>
        </div>
      </div>
      {/* Description section */}
      <div className='description'>
      <h1>Chloro Watch</h1>
      <p>
          Chloro Watch centers on the critical need for a comprehensive, real-time water quality monitoring system to address the increasing 
          threats of eutrophication and algal blooms in freshwater ecosystems. Eutrophication, driven largely by nutrient pollution from 
          agriculture, urban runoff, and industrial activities, has led to significant environmental degradation in lakes and other freshwater 
          bodies worldwide. The proliferation of algae, particularly harmful algal blooms (HABs), poses severe risks to biodiversity, aquatic 
          life, and human health, as well as impacting local economies reliant on these water resources. Traditional water quality monitoring 
          methods often involve periodic sampling and laboratory analysis, which, while accurate, are time-consuming, resource-intensive, 
          and may lack the immediacy needed to address rapid changes in water quality.<br/><br/>

          This project offers a real-time monitoring solution by integrating Arduino-based sensors and machine learning algorithms 
          to predict chlorophyll-a levels, a key indicator of eutrophication and algal biomass. By continuously gathering data on essential 
          water quality parameters—such as pH, dissolved oxygen, temperature, and turbidity—the system provides a proactive, predictive approach 
          that enables timely interventions. The immediacy and accuracy of this system empower local governments, environmental agencies, and communities 
          to make informed decisions and potentially avert critical events like fish kills or HAB-related health issues.<br/><br/>

          Initiative aligns with an innovative approach to water quality management by combining real-time data collection and predictive modeling to 
          support sustainable freshwater ecosystem health. The system’s contribution to sustainable water resource management, environmental protection, a
          nd community resilience represents an essential tool in preserving freshwater ecosystems for current and future generations.<br/><br/>
        </p>
      </div>
    </div>
  );
}

export default AboutChloroWatch;
