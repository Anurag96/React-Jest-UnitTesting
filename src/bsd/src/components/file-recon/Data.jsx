import React from "react";
import { IndividualData } from "./IndividualData";

export const Data = ({ excelData, excelHeader }) => {
  return excelData && excelData.map((individualExcelData, index) => (
    <tr key={individualExcelData[excelHeader[0]] + index}>
      <IndividualData individualExcelData={individualExcelData} excelHeader={excelHeader} />
    </tr>
  ));
};
