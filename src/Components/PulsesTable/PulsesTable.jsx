import React, { useState, useEffect, useCallback } from "react";

import Row from "react-bootstrap/Row";

import PulseCard from "../Cards/PulseCard";

const PulsesTable = ({ pulsesObj }) => {
   const [indicator, setIndicator] = useState("");
   const [type, setType] = useState("");
   const [countryCode, setCountryCode] = useState("");
   const [count, setCount] = useState("");
   const [pulsesArray, setPulsesArray] = useState([]);

   const handlePulsesObjData = useCallback((pulsesObj) => {
      let isEmpty = checkIfOBJisEmpty(pulsesObj.general.base_indicator);
      if (isEmpty) {
         pulsesObj.general.base_indicator.indicator = pulsesObj.general.domain;
         pulsesObj.general.base_indicator.type = pulsesObj.general.type;
         pulsesObj.general.country_code = pulsesObj.geo.country_code;
      }
      setIndicator(pulsesObj.general.base_indicator.indicator);
      setType(pulsesObj.general.base_indicator.type);
      setCountryCode(pulsesObj.general.country_code);
      setCount(pulsesObj.general.pulse_info.count);
      setPulsesArray(pulsesObj.general.pulse_info.pulses);
   }, []);

   const checkIfOBJisEmpty = (Obj) => {
      return Object.keys(Obj).length === 0;
   };

   useEffect(() => {
      if (!pulsesObj) return;
      handlePulsesObjData(pulsesObj);
   }, [pulsesObj, handlePulsesObjData]);

   return (
      <div
         style={{
            marginBottom: 20,
            display: pulsesArray.length > 0 && "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            flexGrow: 1,
            fontSize: 18,
         }}
      >
         <div>
            Indicator : <span style={{ fontWeight: "bold" }}>{indicator && indicator} </span>
         </div>
         <div>
            Type : <span style={{ fontWeight: "bold" }}>{type && type} </span>
         </div>
         <div>
            Country Code :<span style={{ fontWeight: "bold" }}>{countryCode ? countryCode : "No Info"}</span>
         </div>
         <div>
            Number Of Pulses : <span style={{ fontWeight: "bold" }}>{count && count} </span>
         </div>

         <Row style={{ justifyContent: "space-evenly", flexGrow: 1 }}>
            {pulsesArray.length > 0 && pulsesArray.map((pulse) => <PulseCard key={pulse.id} pulse={pulse} />)}
         </Row>
      </div>
   );
};

export default PulsesTable;
