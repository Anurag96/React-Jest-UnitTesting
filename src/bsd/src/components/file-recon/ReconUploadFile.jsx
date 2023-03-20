import { useState } from "react";
import { Data } from "./Data";
import * as XLSX from "xlsx";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { KiteButton, KiteIcon, KiteCard } from '@kite/react-kite';
import { useSelector, useDispatch } from "react-redux";
import { storeIsLoading } from '../../redux/loadingSlice';
import { KiteDialog } from '@kite/react-kite';

function ReconUploadFile() {
  const dispatch = useDispatch();
  // on change states
  const [excelFileError, setExcelFileError] = useState({ file1: null, file2: null });
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState({ file1: null, file2: null });
  const [fileRef, setFileRef] = React.useState({ file1: useRef(), file2: useRef() });
  const [excelHeader, setExcelHeader] = useState();
  const [excelData, setExcelData] = useState();
  const [comparisonError, setComparisonError] = useState('No file selected.');
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(false);
  const [fileIdentical, setFileIdentical] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState('');
  const isLoading = useSelector(state => state.loadingSlice);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];
  const handleFile = (e, index) => {
    let fileObj = e.target.files[0];
    if (fileObj) {
      if (fileObj && fileType.includes(fileObj.type)) {
        setSelectedFile(prevState => ({ ...prevState, [index === 0 ? 'file1' : 'file2']: e.target.files[0] }));
        let reader = new FileReader();
        reader.readAsArrayBuffer(fileObj);
        reader.onload = (e) => {
          setExcelFileError(prevState => ({ ...prevState, [index === 0 ? 'file1' : 'file2']: null }));
        };
        if ((selectedFile.file1 || index === 0) && (selectedFile.file2 || index === 1)) {
          setComparisonError('Files are selected.')
        }
        if ((index === 1 && selectedFile.file1 && selectedFile.file1.name === fileObj.name) || (index === 0 && selectedFile.file2 && selectedFile.file2.name === fileObj.name)) {
          setDialogTitle('Both files have the same file name.')
          setDialogMessage('Do you want to proceed with the comparison?');
          setDialogAction('sameFile');
          setIsOpen(true);
          setFileIdentical(true);
        } else {
          setFileIdentical(false);
        }
      } else {
        setExcelFileError(prevState => ({ ...prevState, [index === 0 ? 'file1' : 'file2']: "Please select only xlsx file types." }));
        setSelectedFile(prevState => ({ ...prevState, [index === 0 ? 'file1' : 'file2']: null }));
      }
    } else {
      console.log("please select your file");
      setSelectedFile(prevState => ({ ...prevState, [index === 0 ? 'file1' : 'file2']: null }));
    }
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(storeIsLoading(true));
    const formData = new FormData();
    formData.append("file1", selectedFile.file1);
    formData.append("file2", selectedFile.file2);

    try {
      let headers = new Headers();

      headers.append("Content-Type", "multipart/form-data");
      headers.append("Accept", "*/*");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Credentials", "true");
      // headers.append("Authorization", "Basic dXNlcjo0OTZhY2NmMC0zYTU0LTQ3ZjktOTQ4Yy1mMTRlY2NlMTlhYmI=");
      headers.append("GET", "POST", "OPTIONS");
      const response = await axios({
        // eslint-disable-next-line
        method: "post",
        url: "http://bsdtools-dev.corp.chartercom.com:8090/internal/recons/file",
        data: formData,
        headers: headers,
      });
      dispatch(storeIsLoading(false));
      setExcelData(response && response.data && response.data.length ? response.data : []);
      setExcelHeader(response && response.data && response.data.length ? Object.keys(response.data[0]) : [])
      setComparisonError("")
    } catch (error) {
      console.log(error);
      dispatch(storeIsLoading(false));
      setExcelData(null);
      setExcelHeader(null);
      setComparisonError(error.message)
    }
  };

  const downloadFile = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "comparison.xlsx");
  }

  const clearDataConfirmation = () => {
    setDialogTitle('Restart a new comparison?')
    setDialogMessage('Restarting will delete the current files changes.');
    setDialogAction('clear');
    setIsOpen(true);
  }

  // const clearData = () => {
  //   setSelectedFile({ file1: null, file2: null });
  //   setExcelFileError({ file1: null, file2: null });
  //   setComparisonError("No file selected.");
  //   setExcelData(null);
  //   fileRef.file1.current.value = "";
  //   fileRef.file2.current.value = "";
  //   setIsOpen(false);
  // }

  const clearData = (e) => {
    setIsOpen(false);
    switch (dialogAction) {
      case 'sameFile':
        setFileIdentical(false);
        handleSubmit(e);
        break;
      case 'clear':
        setSelectedFile({ file1: null, file2: null });
        setExcelFileError({ file1: null, file2: null });
        setComparisonError("No file selected.");
        setExcelData(null);
        fileRef.file1.current.value = "";
        fileRef.file2.current.value = "";
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <KiteDialog
        id="1"
        open={isOpen}
        title={dialogTitle}
        icon="ki-caution-circle-f"
        onClose={() => setIsOpen(false)}
        primaryBtnLabel="OK"
        onPrimaryBtnClick={clearData}
        secondaryBtnLabel="Cancel"
        onSecondaryBtnClick={() => setIsOpen(false)}
      >
        <div className="kite-dialog__content-group">
          {dialogMessage}
        </div>
      </KiteDialog>
      <div className=" container shadow-sm p-1 rounded" style={{ width: "25rem", backgroundColor: "aliceblue" }}>
        {/* Compare file header section */}
        <div className="h-100 d-flex align-items-center justify-content-center" >

          <KiteIcon
            ariaLabel=""
            badge=""
            className=""
            fill="#0073D1"
            icon="ki-document-f"
            title=""
            inline="true"
            size="40px"
          />
          <div className="mx-3 my-1"><h4>File Comparison Tool</h4>
          </div>

        </div>
      </div>

      {/* upload file section */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row align-items-start">
              <div className="col">
                <label className="required">
                  <h5>XLSX file : 1</h5>
                </label>
                <br></br>
                <input
                  type="file"
                  ref={fileRef.file1}
                  className="form-control"
                  onChange={(e) => { handleFile(e, 0) }}
                  required
                ></input>
                {excelFileError && excelFileError.file1 && (
                  <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                    {excelFileError.file1}
                  </div>
                )}
              </div>
              <div className="col">
                <label>
                  <h5>XLSX file : 2</h5>
                </label>
                <br></br>
                <input
                  type="file"
                  ref={fileRef.file2}
                  className="form-control"
                  onChange={(e) => { handleFile(e, 1) }}
                  required
                ></input>
                {excelFileError && excelFileError.file2 && (
                  <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                    {excelFileError.file2}
                  </div>
                )}
              </div>
              {fileIdentical &&
                (<div className="mt-3" style={{ textAlign: 'center', color: 'red' }}>
                  Both files should not be identical.
                </div>
                )
              }
              <div className="my-4" id="btn">
                <KiteButton size={"xl"} type="submit" variant="contained" icon="ki-chevron-right-circle" disabled={isLoading || !selectedFile.file1 || !selectedFile.file2 || fileIdentical}>Start Compare</KiteButton>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr />
      {/* view file section */}
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <h5>XLSX file difference</h5>
            <div className="viewer">
              {!excelData || !excelData.length ? comparisonError : ""}
              {excelData && excelData.length && (

                <div className="table-responsive">

                  <KiteButton icon="ki-download" variant="primary" size={'sm'} onClick={() => downloadFile(excelData)}>Download</KiteButton>
                  <KiteButton icon="ki-restart" className="my-2 mx-2" size={'sm'} type="button" variant="contained" onClick={() => clearDataConfirmation()} disabled={!selectedFile.file1 && !selectedFile.file2}>Restart</KiteButton>
                  <table className="table">
                    <thead>
                      <tr>
                        {
                          excelHeader && excelHeader.map((excelKey, index) => (
                            <th key={excelKey + index} scope="col">{excelKey ? excelKey.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").toUpperCase() : ""}</th>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={excelData} excelHeader={excelHeader} />
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReconUploadFile;
