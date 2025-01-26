
function Legend(){
    return(
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px', gap: '10px' }}>
              <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px', border: '1px solid gray', borderRadius: '0px', backgroundColor: '#f9f9f9', fontSize: '11px', width: '48%' }}>
                <p style={{ color: 'black' }}>
                  Department of Environment and Natural Resources (Guidelines)
                </p>
                <p style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'gray' }}>Water Body Classification</p>
                <p style={{ fontStyle: 'italic', marginLeft: '20px', color: 'gray' }}><strong>Class C & SC</strong></p>
                <div style={{ fontStyle: 'italic', marginTop: '0px', paddingTop: '5px', paddingBottom: '0px', borderTop: '1px solid gray' }}>
                  <p style={{ fontStyle: 'italic', margin: '0', color: 'gray' }}><strong>Temperature:</strong> 25-31°C</p>
                  <p style={{ fontStyle: 'italic', margin: '0', color: 'gray' }}><strong>pH:</strong> 6.5-9.0</p>
                  <p style={{ fontStyle: 'italic', margin: '0', color: 'gray' }}><strong>Dissolved Oxygen (Minimum):</strong> 5 mg/L</p>
                  <p style={{ fontStyle: 'italic', margin: '0', color: 'gray' }}><strong>Turbidity (Maximum):</strong> 50 FNU</p>
                </div>
              </div>

              <div style={{ fontFamily: 'Arial, sans-serif', padding: '10px', border: '1px solid gray', borderRadius: '0px', backgroundColor: '#f9f9f9', fontSize: '11px', width: '48%'}}>
                <p style={{  color: 'black' }}>Laguna Lake Development Authority (Chlorophyll-A Concentration Standards)</p>
                <p style={{ fontStyle: 'italic',fontWeight: 'bold', color: 'gray' }}>Chlorophyll-A Level Classification</p>
                <div style={{ ontStyle: 'italic', marginTop: '0px', paddingTop: '5px', paddingBottom: '0px', borderTop: '1px solid gray' }}>
                  <p style={{ fontStyle: 'italic',margin: '0', color: 'gray' }}><strong>Oligotrophic:</strong> below 10 µg/L</p>
                  <p style={{ fontStyle: 'italic',margin: '0', color: 'gray' }}><strong>Mesotrophic:</strong> 10–25 µg/L</p>
                  <p style={{ fontStyle: 'italic',margin: '0', color: 'gray' }}><strong>Eutrophic:</strong> above 25 µg/L</p>
                </div>
              </div>
            </div>
         );
    
    }
    
export default Legend;