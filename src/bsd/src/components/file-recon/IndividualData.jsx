import React from "react";

export const IndividualData = ({ individualExcelData, excelHeader }) => {
  return (
    <>
      {
        excelHeader.map((excelKey, index) => (
          <td key={individualExcelData[excelKey]+index}>{individualExcelData[excelKey]}</td>
        ))
      }
    </>
  );
};
