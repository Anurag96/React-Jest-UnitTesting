import * as React from "react";
import Reconuploadfile from "./ReconUploadFile";
import "../../css/reconuploadfile.css";
import "../../css/filerecon.css";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from './SideBar'

export default function FileRecon() {
  // throw new Error('Cannot read properties of undefined')
  return (
    <>
      <div component="main" id ="main" >
        <Sidebar />  
        <Reconuploadfile />
      </div>
    </>
  );
}
