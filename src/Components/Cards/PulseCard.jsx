import React, { useState, useEffect, useCallback } from "react";

import Card from "react-bootstrap/Card";

import { convertDataObjToString } from "../../util/util";

const PulseCard = ({ pulse }) => {
   const [createdAt, setCreatedAt] = useState();
   const [modifiedAt, setModifiedAt] = useState();

   const isPhone = window.innerWidth < 600 && window.innerWidth > 0;

   const isTablet = window.innerWidth > 600 && window.innerWidth < 960;

   const isDesktop = window.innerWidth > 960 && window.innerWidth < 1400;

   const getPulseDates = useCallback((pulse) => {
      let createAt = new Date(pulse.created);
      let modifiedAt = new Date(pulse.modified);
      createAt = convertDataObjToString(createAt);
      modifiedAt = convertDataObjToString(modifiedAt);
      setCreatedAt(createAt);
      setModifiedAt(modifiedAt);
   }, []);

   useEffect(() => {
      if (!pulse) return;
      getPulseDates(pulse);
   }, [pulse, getPulseDates]);

   return (
      <Card
         border="primary"
         style={{ width: isPhone ? "100%" : isTablet ? "48%" : isDesktop ? "30%" : "24%", margin: 5 }}
         className="mb-2"
      >
         <Card.Body>
            <div
               style={{
                  display: "flex",
                  alignItems: isPhone ? "center" : "flex-start",
                  flexDirection: "column",
                  justifyContent: "space-around",
               }}
            >
               <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                  <span style={{ fontSize: 14, marginLeft: 10 }}>{pulse.description ? pulse.description : "  No Data"}</span>
               </div>
               <div>
                  <span style={{ fontWeight: "bold" }}> Modified Text: </span>
                  <span style={{ fontSize: 14 }}>{pulse.modified_text ? pulse.modified_text : "No Data"}</span>
               </div>
            </div>
            <div style={{ marginTop: 10 }}>
               <span>
                  <div>
                     <span style={{ fontWeight: "bold", fontSize: 12 }}> Created At: </span>
                     <span style={{ fontSize: 12 }}>{createdAt ? createdAt : "No Data"}</span>
                  </div>
                  <div>
                     <span style={{ fontWeight: "bold", fontSize: 12 }}> Modified At: </span>
                     <span style={{ fontSize: 12 }}>{modifiedAt ? modifiedAt : "No Data"}</span>
                  </div>
               </span>
            </div>
         </Card.Body>
      </Card>
   );
};

export default PulseCard;
