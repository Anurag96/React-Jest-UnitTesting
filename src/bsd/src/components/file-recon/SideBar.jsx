import * as React from "react";
import '../../css/filerecon.css';
import "bootstrap/dist/css/bootstrap.css";
import { KiteButton, KiteIcon } from "@kite/react-kite";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { storeIsLoading } from '../../redux/loadingSlice';

export default function SideBar() {
//     let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const navigateDummy = () => {
//     dispatch(storeIsLoading(true));
//     setTimeout(() => {
//       dispatch(storeIsLoading(false));
//       navigate('/dummy');
//     }, 1500);
//   };
  return (
          <div id="mySidenav" className="sidenav">
            <KiteButton legacy icon = "ki-menu" 
              variant="primary" 
              className="menubutton"
              onClick= {() => {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
                document.getElementsByClassName("menubutton")[0].style.display = 'none';
                document.getElementsByClassName("closebtn")[0].style.display = 'block';
                var elements = document.getElementsByClassName("options");
                for(var i = 0;i<elements.length;i++) {
                  elements[i].style.display = 'block';
                }
              }
              }
            />
            <KiteButton legacy icon = "ki-x" 
                variant="primary"
                className="closebtn" 
                onClick= {() => {
                  document.getElementById("mySidenav").style.width = "53px";
                  document.getElementById("main").style.marginLeft= "53px";
                  document.getElementsByClassName("menubutton")[0].style.display = 'block';
                  document.getElementsByClassName("closebtn")[0].style.display = 'none';
                  var elements = document.getElementsByClassName('options');
                  var options = document.getElementsByClassName("optionsbtn");
                  for(var i = 0;i<elements.length;i++) {
                    elements[i].style.display = 'none';
                  }
                  for(var j = 0;j<options.length;i++){
                    options[i].style.display = 'block';
                  }
                }
                }
            />
            {/* Drawer Content begin */}
            <div class="options"><h3 id ="menuhead">&ensp; </h3></div><br/>
            <div class="options">
              <a href="#" >
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                My recent Activity
              </a>
            </div>
            <div class="options">
              <a href="#" >
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                Share with me
              </a>
            </div>
            <div class="options">
              <a href="#">
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                All activity
              </a>
            </div>
            <div class="options">
              <a href="#" >
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                Manage Output Folders
              </a>
            </div>
            <div class="options">
              <a href="#" >
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                FAQ
              </a>
            </div>
            <div class="options">
              <a href="#" >
                <KiteIcon icon = "ki-compass" 
                    fill="#0073D1"
                    size="30px"
                    className="optionsbtn"
                /> 
                Settings
              </a>
            </div>
            {/* Drawer Content end */}
          </div>
        
    
  );
}
