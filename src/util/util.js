const createExcelFromJson = (JSON, setLoading) => {
   setLoading(true);
   let fileTitle, fileData, headers;

   let updatedPulseObjArray = [];

   let generalData = JSON;

   generalData.forEach((pulsesObj) => {
      let PulsesData = pulsesObj.general.pulse_info.pulses;
      if (PulsesData.length > 0) {
         PulsesData.forEach((PulsesData) => {
            let Indicator = pulsesObj.general.base_indicator.indicator;
            let Type = pulsesObj.general.base_indicator.type;
            let CountryCode = pulsesObj.general.country_code;
            let description = PulsesData.description;
            let ModifiedText = PulsesData.modified_text;
            let createdAt = convertDataObjToString(PulsesData.created);
            let modifiedAt = convertDataObjToString(PulsesData.modified);

            if (description.includes(",")) {
               description = description.replace(",", " ");
            }

            let updatedPulseObj = {
               Indicator: Indicator ? Indicator : "No Data",
               Type: Type ? Type : "No Data",
               CountryCode: CountryCode ? CountryCode : "No Data",
               description: description ? description : "No Data",
               ModifiedText: ModifiedText ? ModifiedText : "No Data",
               modifiedAt: modifiedAt ? modifiedAt : "No Data",
               createdAt: createdAt ? createdAt : "No Data",
            };

            updatedPulseObjArray.push(updatedPulseObj);
         });
      }
   });

   headers = {
      Indicator: "Indicator",
      Type: "Type",
      CountryCode: "Country Code",
      description: "Description",
      ModifiedText: "Modified Text",
      modifiedAt: "Modified At",
      createdAt: "Created At",
   };

   fileTitle = "Pulses Report";

   fileData = updatedPulseObjArray;

   exportCSVFile(headers, fileData, fileTitle, setLoading);
};

const exportCSVFile = (headers, items, fileTitle, setLoading) => {
   if (headers) {
      items.unshift(headers);
   }
   var jsonObject = JSON.stringify(items);

   var csv = convertToCSV(jsonObject);

   var universalBOM = "\uFEFF";

   csv = universalBOM + csv;

   var exportedFilenmae = fileTitle + ".csv" || "export.csv";

   var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
   if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportedFilenmae);
   } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
         var url = URL.createObjectURL(blob);
         link.setAttribute("href", url);
         link.setAttribute("download", exportedFilenmae);
         link.style.visibility = "hidden";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
   }
   setTimeout(() => {
      setLoading(false);
   }, 400);
};

const convertToCSV = (objArray) => {
   const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
   let str = "";

   for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
         var temp = array[i][index];
         if (line !== "") line += ",";
         if (typeof array[i][index] === "object") {
            temp = JSON.stringify(temp);
         }
         line += temp;
      }
      str += line + "\r\n";
   }
   return str;
};

const checkIfOBJisEmpty = (Obj) => {
   return Object.keys(Obj).length === 0;
};

const convertDataObjToString = (dataObj) => {
   if (!dataObj) return;
   let d = new Date(dataObj);
   let year = d.getFullYear().toString();
   let month = (d.getMonth() + 1).toString();
   let day = d.getDate().toString();
   let hours = d.getHours().toString();
   let minutes = d.getMinutes().toString();

   //    if (hours < 9) hours = `0${hours}`;
   if (minutes < 9) minutes = `0${minutes}`;

   return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export { createExcelFromJson, checkIfOBJisEmpty, convertDataObjToString };
