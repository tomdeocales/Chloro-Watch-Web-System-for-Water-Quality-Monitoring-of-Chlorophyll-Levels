import React, { useEffect } from 'react';

function AboutUs() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "Chloro Watch | About Us";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Banner section */}
      <div className='banner CholoroWatch'>
        <div className='banner-title'>
          <h1>About Us</h1>
          <span>Who we are?</span>
        </div>
      </div>
      {/* Description section */}
      <div className='description'>
        <p>
          Welcome to LSPU-LB’s Environmental Solutions, where we integrate modern technology with environmental stewardship to monitor and protect water quality in our 
          lakes and aquatic systems. Our Chloro Watch initiative is specifically designed to address eutrophication through real-time monitoring of chlorophyll levels and 
          essential water quality parameters such as pH, dissolved oxygen, temperature, and turbidity. This web-based system combines Arduino sensor
          technology and a predictive model, providing local stakeholders with approximate and immediate data essential for proactive water resource management.<br/><br/>
        </p>

        <h1>Our Mission</h1>
        <p>
          Our mission is to harness innovative data-driven solutions that empower communities and regulatory agencies to make informed, sustainable 
          decisions for lake management. With Chloro Watch, we are creating a sustainable monitoring platform to promote ecological balance and minimize 
          the risk of harmful algal blooms, ultimately contributing to the resilience of aquatic ecosystems.<br/><br/>
        </p>
        
        <h1>Why Lakes Matter</h1>
        <p>
          Our approach leverages cutting-edge machine learning algorithms and IoT to enable real-time monitoring and alerting of critical water quality changes. 
          By integrating Chloro Watch with the AquaSense platform, we extend our capabilities beyond data acquisition, creating predictive models to inform local 
          and regional water quality management.<br/><br/>
        </p>
        
        <h1>Our Approach</h1>
        <p>
          At LSPU-LB’s Environmental Solutions, we invite you to join us in fostering sustainable lake management practices. Together, through 
          data and innovation, we can safeguard our aquatic environments and ensure they continue to support biodiversity, community well-being, 
          and sustainable development.<br/><br/>
        </p>
        
        <h1>Innovation Through Technology</h1>
        <p>
          Our proposed project involves the development of an intelligent system based on machine learning algorithms. This system aims to enhance 
          water quality monitoring by leveraging the latest advancements in artificial intelligence. Expanding beyond real-time data acquisition, 
          our system incorporates predictive modeling to assess ecological carrying capacity, providing valuable insights for sustainable water 
          resource management.<br/><br/>
        </p>
        
        <h1>Sustainability and Impact</h1>
        <p>
          Our project contributes to sustainable water resource management, supporting the goals of resilient communities and aquatic ecosystems. 
          By providing continuous, approximate data on water quality parameters, our system empowers local authorities and community stakeholders 
          to make informed, proactive decisions. The outcomes align with Sustainable Development Goals (SDGs), particularly SDG 11 for Sustainable 
          Cities and Communities, SDG 14 for Life Below Water, and also support food security under SDG 2 by enhancing the quality of water that sustains 
          fisheries and related livelihoods​<br/><br/>
        </p>
        
        <h1>Join Us in Preserving Our Lakes</h1>
        <p>
          At LSPU-LB’s Environmental Solutions, we invite you to join us in fostering sustainable lake management practices. Together, through 
          data and innovation, we can safeguard our aquatic environments and ensure they continue to support biodiversity, community well-being, 
          and sustainable development.<br/><br/>
        </p>


        <span></span>
        {/*Image and video tags
        <img alt=''/>
        <video controls>
          <source src type="video/mp4" />
        </video>
        */}
      </div>

    </div>
  );
}

export default AboutUs;
