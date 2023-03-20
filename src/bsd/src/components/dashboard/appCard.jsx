import * as React from "react";
import { KiteIcon } from '@kite/react-kite';
import { useNavigate } from "react-router-dom";
import { KiteCard, KiteButton } from '@kite/react-kite';
import {  useDispatch } from "react-redux";
import { storeIsLoading } from '../../redux/loadingSlice';

export default function AppCard(props) {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateFilerecon = () => {
    dispatch(storeIsLoading(true));
    setTimeout(() => {
      dispatch(storeIsLoading(false));
      navigate('/filerecon');
    }, 1500);
  };

  return (
    <>
      <KiteCard className="kite-style" elevation="3">
        <div className="mx-3">
        <div className="d-flex flex-row align-items-center border-bottom">
          <KiteIcon
            ariaLabel=""
            badge=""
            className=""
            fill="#0073D1"
            icon="ki-billing-f"
            title=""
            offset="10"
            inline="true"
            size="40px"
            onClick={navigateFilerecon}
          />
          <div>
            <div className="fs-xl text-truncate text-truncate-lg text-info mx-3"  onClick={navigateFilerecon} >
              <h5> {props.data.title}</h5>
            </div>
            <div className="text-truncate text-truncate-xl  mx-3 my-2">
              {props.data.subTitle}
            </div>
          </div>
        </div>
        <div className="container my-3">
          <div className="d-flex flex-row align-items-center" >
            <KiteIcon
              ariaLabel=""
              badge=""
              className=""
              fill="#0073D1"
              icon="ki-pin-f"
              title=""
              inline="true"
              size="20px"
            />
            <div className="mx-3 my-3">{props.data.description} </div>
          </div>
        </div>
        <div>
          <KiteButton className="mx-2" icon="" legacy onClick={navigateFilerecon}>Access</KiteButton>
          {/* <KiteButton legacy className="mx-2" disabled>Request Access</KiteButton> */}
        </div>
        </div>
      </KiteCard>
    </>
  );
}
