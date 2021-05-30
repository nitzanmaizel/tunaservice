import React, { useState, useLayoutEffect } from "react";

import Container from "react-bootstrap/Container";
import DemoJSON from "../../Services/DemoJSON";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import PulsesTable from "../PulsesTable/PulsesTable";
import { createExcelFromJson } from "../../util/util";
import SearchForm from "../SearchForm/SearchForm";

const HomePage = () => {
   const [pulsesArray, setPulsesArray] = useState([]);
   const [loadingExcel, setLoadingExcel] = useState(false);
   const [loadingSearch, setLoadingSearch] = useState(false);
   const [size, setSize] = useState([0, 0]);

   const isPhone = size[0] < 600 && size[0] > 0;
   const isDesktop = size[0] > 800;

   useLayoutEffect(() => {
      if (DemoJSON) setPulsesArray(DemoJSON);
      function updateSize() {
         setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   console.log(loadingSearch, "loadingSearch");

   return (
      <Container style={{ marginTop: 20, maxWidth: isPhone ? "100%" : isDesktop ? 1440 : 960 }}>
         <h1>Create Excel</h1>
         <div style={{ marginBottom: 20 }}>
            <SearchForm
               pulsesArray={pulsesArray}
               setPulsesArray={setPulsesArray}
               isPhone={isPhone}
               loadingSearch={loadingSearch}
               setLoadingSearch={setLoadingSearch}
               DemoJSON={DemoJSON}
            />
         </div>
         <Button
            disabled={loadingExcel}
            variant="info"
            onClick={() => createExcelFromJson(pulsesArray, setLoadingExcel)}
            style={{ minWidth: 140, minHeight: 50, marginBottom: 20 }}
         >
            {loadingExcel ? <Spinner animation="border" variant="light" /> : "Download Excel"}
         </Button>
         {pulsesArray.length > 0 && !loadingSearch ? (
            pulsesArray.map((pulsesObj, i) => <PulsesTable key={i} pulsesObj={pulsesObj} />)
         ) : loadingSearch ? (
            <div>
               <Spinner animation="border" variant="primary" />
            </div>
         ) : (
            <div style={{ marginTop: 30 }}>
               No Result
               {/* <Spinner animation="border" variant="primary" /> */}
            </div>
         )}
      </Container>
   );
};

export default HomePage;
