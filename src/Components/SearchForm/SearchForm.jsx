import React, { useCallback, useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { checkIfOBJisEmpty } from "../../util/util";

const SearchForm = ({ pulsesArray, setPulsesArray, isPhone, setLoadingSearch, DemoJSON }) => {
   const [formData, setFormData] = useState({
      indicator: "",
      type: "",
      countryCode: "",
      description: "",
      modifiedText: "",
   });

   let { indicator, type, countryCode, description, modifiedText } = formData;

   useEffect(() => {
      if (pulsesArray.length > 0) {
         handlePulsesObjData(pulsesArray);
      }
   }, [pulsesArray]);

   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   const searchByQuery = () => {
      setLoadingSearch(() => true);
      setPulsesArray([]);
      let filter = {};
      let searchResult = [];
      if (indicator) filter.indicator = indicator.toLocaleLowerCase();
      if (type) filter.type = type.toLocaleLowerCase();
      if (countryCode) filter.countryCode = countryCode.toLocaleLowerCase();
      if (description) filter.description = description.toLocaleLowerCase();
      if (modifiedText) filter.modifiedText = modifiedText.toLocaleLowerCase();

      console.log(pulsesArray, "pulsesArray");

      let isFilterEmpty = checkIfOBJisEmpty(filter);

      if (!isFilterEmpty) {
         DemoJSON.forEach((pulseObj) => {
            let pulseIndicator;
            let pulseType;
            let pulseCountryCode;

            if (filter.indicator) pulseIndicator = pulseObj.general.base_indicator.indicator.toLocaleLowerCase();

            if (filter.type) pulseType = pulseObj.general.base_indicator.type.toLocaleLowerCase();

            if (filter.countryCode && pulseObj.general.country_code)
               pulseCountryCode = pulseObj.general.country_code.toLocaleLowerCase();

            if (pulseIndicator && !pulseType && !pulseCountryCode) {
               if (pulseIndicator.includes(filter.indicator)) searchResult.push(pulseObj);
            }
            if (pulseType && !pulseIndicator && !pulseCountryCode) {
               if (pulseType.includes(filter.type)) searchResult.push(pulseObj);
            }
            if (pulseCountryCode && !pulseIndicator && !pulseType) {
               if (pulseCountryCode.includes(filter.countryCode)) searchResult.push(pulseObj);
            }
            if (pulseIndicator && pulseType) {
               if (pulseType.includes(filter.indicator) && pulseType.includes(filter.type)) searchResult.push(pulseObj);
            }

            if (pulseIndicator && pulseCountryCode) {
               if (pulseIndicator.includes(filter.indicator) && pulseCountryCode.includes(filter.countryCode))
                  searchResult.push(pulseObj);
            }
            if (pulseType && pulseCountryCode) {
               if (pulseType.includes(filter.type) && pulseCountryCode.includes(filter.countryCode)) searchResult.push(pulseObj);
            }

            setTimeout(() => {
               setLoadingSearch(false);
               setPulsesArray(searchResult);
            }, 400);
         });
      } else {
         setTimeout(() => {
            setLoadingSearch(false);
            setPulsesArray(DemoJSON);
         }, 400);
      }

      //   console.log({ indicator, type, countryCode, description, modifiedText }, "pulsesArray");
   };

   const handlePulsesObjData = useCallback((pulsesObj) => {
      //   let isEmpty = checkIfOBJisEmpty(pulsesObj.general.base_indicator);
      console.log(pulsesObj);
      //   if (isEmpty) {
      //      pulsesObj.general.base_indicator.indicator = pulsesObj.general.domain;
      //      pulsesObj.general.base_indicator.type = pulsesObj.general.type;
      //      pulsesObj.general.country_code = pulsesObj.geo.country_code;
      //   }
      //   let indicator = pulsesObj.general.base_indicator.indicator;
      //   let type = pulsesObj.general.base_indicator.type;
      //   let countryCode = pulsesObj.general.country_code;
      //   let pulsesArray = pulsesObj.general.pulse_info.pulses;
   }, []);

   return (
      <Form>
         <Form.Row style={{ flexDirection: isPhone ? "column" : "row" }}>
            <Col>
               <Form.Control placeholder="Indicator" name="indicator" value={indicator} onChange={(e) => onChange(e)} />
            </Col>
            <Col>
               <Form.Control placeholder="Type" name="type" value={type} onChange={(e) => onChange(e)} />
            </Col>
            <Col>
               <Form.Control placeholder="Country Code" name="countryCode" value={countryCode} onChange={(e) => onChange(e)} />
            </Col>
            <Col>
               <Form.Control placeholder="Description" name="description" value={description} onChange={(e) => onChange(e)} />
            </Col>
            <Col>
               <Form.Control placeholder="Modified Text" name="modifiedText" value={modifiedText} onChange={(e) => onChange(e)} />
            </Col>
            <Button
               variant="info"
               onClick={() => searchByQuery(pulsesArray, indicator, type, countryCode, description, modifiedText)}
               style={{
                  minWidth: 70,
                  minHeight: 38,
                  marginRight: isPhone ? 5 : 0,
                  marginLeft: isPhone ? 5 : 0,
                  marginTop: isPhone ? 10 : 0,
               }}
            >
               Search
            </Button>
         </Form.Row>
      </Form>
   );
};

export default SearchForm;
