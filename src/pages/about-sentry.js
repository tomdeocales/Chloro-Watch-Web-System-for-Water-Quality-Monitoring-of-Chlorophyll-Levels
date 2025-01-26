import React, { useEffect } from 'react';

function AboutSentry() {
  // Set document title and scroll to top on component mount
  useEffect(() => {
    document.title = "About Sentry | E-Sentry - Laguna State Polytechnic University";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Banner section */}
      <div className='banner sentry'>
        <div className='banner-title'>
          <h1>About Sentry</h1>
          <span>What is E-Sentry?</span>
        </div>
      </div>
      {/* Description section */}
      <div className='description'>
        {/* Rationale */}
        <h1>Rationale</h1>
        <p>
          Lakes offer significant socioeconomic benefit by providing a wide range of ecological goods and services, contributing 
          to the people's livelihood and social welfare (Lamsal et al., 2015; Yilma, 2019; Genremedhin & Belliethathan, 2020). In-lake 
          activities (i.e., aquaculture and ecotourism) in particular, offer opportunities to address food and economic security (Bontoux, 
          2009; Allison, 2011; Béné et al., 2015). However, the long-term effects of these industries to the lake environments calls for 
          critical and effective management to ensure optimal ecosystem services and sustainable utilization of the aquatic resources.
          While intensive aquaculture, for instance, brings livelihood opportunities to lakeshore communities, it also disrupts the water 
          quality of lakes (Osei et al., 2019) – leading to eutrophication and pollution. To mitigate the impact of aquaculture operations, 
          the Fisheries and Aquaculture Department (FAO) recommends for the adaptation of the Ecosystem Approach to Aquaculture 
          (EAA). This is a strategic framework which considers the optimal ecological functioning and integrity of the water environment
          in promoting sustainable aquaculture developments (FAO, 2010).<br/><br/>

          The predictive estimation of ecological carrying capacity (CC) forms an integral component of the EAA, through which 
          the upper limits for aquaculture is determined based on the environmental limitations and social acceptability (Oakley, 2017). 
          The evaluation of CC is one of the most important tools for implementing the EAA and can be applied across a multitude of 
          scales (Ross et al., 2013). The main purpose is to determine the level of resource use which can be sustained by the natural 
          environment over the long term, while avoiding unacceptable changes to normal ecosystem functioning and social structure. 
          The absence of a relevant policy (e.g., local ordinance), however, practically limits the integration of CC model estimates in
          lake development and sustainability plans of the local government units (Brugère et al., 2018).<br/><br/>

          The reliability of the CC models depends on several components such as hydro-economic interaction, socioeconomic 
          development constraints, water supply, and water quality (Dou et al., 2015). The collection and simulation of the water quality
          are, therefore, paramount to developing CC models. In this regard, numerous machine learning and deep learning algorithms 
          have been developed to facilitate classification of natural waters by predictive simulation of water quality parameters (Solanki 
          et al., 2015; Haghiabi et al., 2018). The integration of machine and deep learning techniques enables the real-time monitoring 
          of water quality parameters with high accuracy and efficiency for improved reliability of water classifications (Dilmi and Ladjal, 
          2021). These techniques made use of chronological data, among others, to construct models for predictive simulation of the 
          water quality in water reservoir, based on artificial intelligence (Ahmeda, et al., 2019; Lerios and Villarica, 2019; Aldhyani et 
          al., 2020; Tiyasha et al., 2021). In certain experiments done in situ, the robustness of the deep learning algorithms has been 
          empirically proven capable of capturing extreme levels (i.e., high and low ranges) of water quality variables, thereby provides 
          better insights as to which among these parameters is/are significantly contributing to the prediction process.<br/><br/>

          This proposed project aims to develop an intelligent system based on deep learning algorithms, to augment the utility 
          of water quality monitoring for improved classification of natural water bodies. This proposed AI system, in particular, will be 
          integrated to the pre-existing system for water quality monitoring i.e., Sensing Environmental Parameters through Telemetry 
          (SENTRY). Equipped with advanced water quality sensors, SENTRY was initially launched by DOST Region 4A in 2015 for 
          automated data acquisition in real-time (www.dost.gov.ph). This project will undertake the system enhancement of SENTRY, 
          to expand its basic predictive function from mere water quality simulation, to integrate the model estimation of ecological CC 
          of lakes. The model for CC estimation will be developed utilizing the datasets for various water quality parameters (generated 
          by SENTRY) and meteorological data. The integration of CC model estimation capabilities in SENTRY is an expansion pack,
          advancing the system’s practical applications in lake management and industrial development initiatives.<br/><br/>

          The AI innovations intended in this project will be proven beneficial when the same is integrated as part of sustainable 
          developments frameworks for adoption by the lake regulatory agencies and/or the local government units. The outcomes of 
          this project are consistent with the targets of the Sustainable Development Goals (SDGs), the Sendai Framework for Disaster 
          Risk Reduction (DRR), and the Paris Climate Agreement.<br/><br/>
        </p>
        
        {/* Review of Literature */}
        <h1>Review of Literature</h1>
        <p>
          The application of deep learning algorithm (DLA) in predictive simulation of aquatic environments has been reported 
          in several studies. DLA was applied in the predictive analysis of water quality parameters in Chaskaman River, Maharashtra, 
          India (Solanki, 2015). The study assessed the different aspects of water quality and their association to water contamination. 
          The water quality parameters measured in the study include dissolved oxygen (DO), pH, and turbidity. The water parameters 
          were then utilized in the development of robust water quality prediction models, intended for use in water management. The 
          methods employed deep learning techniques, facilitating an unsupervised learning with more accurate results relative to a 
          supervised technique. The unsupervised predictive model based on DLA was demonstrated for its acceptable accuracy rate 
          based on data variation.<br/>
          Assem (2015) reported the long-term prediction of water flow and level parameters in Ireland Shannon River for over 
          30 years period from 1983 to 2013. This study documented a framework with three components i.e., city-wide scale analytics, 
          data fusion, and domain knowledge data analytics. The model based on DLA was developed by employing deep convolution 
          neural networks (DeepCNNs) exploit in time-series data. The datasets which include maximum temperature, minimum water 
          level, water flow, runoff, among others, were considered in the model construct. The utility of the deep model was highlighted 
          for its potential to capture abnormalities by setting and comparing thresholds to the predicted water flow and water level.<br/><br/>
          DLA was also utilized by Zheng et al. (2015) in the development of surrogate physics-based models on hydraulic and 
          water quality. The report elaborated the applicability of integrating predictive analysis, data fusion, and system simulation in 
          model construction, including as well the abnormal events detection from recorded time series data, water usage predictions, 
          and meta-models. The outcomes of the model showed that DLA can facilitate automatic learning with slightly better accuracy 
          on water distributed predictions. The authors deduced that relative the conventional techniques based on the Artificial Neural 
          Network (ANN), Deep Learning (DL) was capable of unsupervised, layer-by-layer self-learning of the data features, resulting 
          in a data-driven model for water distribution management, derived using sufficient dataset.
        </p>
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

export default AboutSentry;
