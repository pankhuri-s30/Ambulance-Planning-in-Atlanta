import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { Component, useEffect, useState } from 'react';
// import { useState } from "react";
// import { MakeApiCall } from './App';
import Results from './Results';
import { render } from '@testing-library/react';
import axios from 'axios';
// import { getAllHospitals } from './MapsDisplay';

function MakeApiCall(payload) {
  // const [isLoading, setLoading] = useState(true);
  // const [hospData, setHospData] = useState([]);
  axios.get(`http://127.0.0.1:5000/getOptimalPlacement`, { payload })
  .then(res => {
    console.log('Response from POST call: ', res);
    return res;
    // console.log(res.data);
  })
  // const response = ['yas'];
  // return response;
}


const Filters = () => {
  const [countyOption, setCountyOption] = useState("1");
  const [timeOption, setTimeOption] = useState("1");
  const [amPmOption, setAmPmOption] = useState("AM");
  const [ambulanceCountOption, setAmbulanceCountOption] = useState(0);
  const [callsPerDay, setcallsPerDay] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [avgRespTime, setAvgRespTime] = useState(0);
  const [worstRespTime, setWorstRespTime] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [hospData, setHospData] = useState([]);
  const [payloadData, setPayloadData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);


  const handleChangeCounty = (selectedOption) => {
    setCountyOption(selectedOption);
  }
  const handleChangeTime = (selectedOption) => {
    setTimeOption(selectedOption);
  }
  const handleChangeAmPm = (selectedOption) => {
    setAmPmOption(selectedOption);
  }
  const handleChangeAmbulanceCount = (selectedOption) => {
    setAmbulanceCountOption(selectedOption);
  }
  const handleChangeCallsCount = (selectedOption) => {
    setcallsPerDay(selectedOption);
  }
  useEffect((payload = {}) => {
    axios.get(`http://127.0.0.1:5000/getOptimalPlacement`).then(response => {
      var table = response.data;
      setTableData(table);
      setAvgRespTime(table.data?.average_response_time);
      setWorstRespTime(table.data?.worst_response_time);
      render (isButtonClicked && <Results tableData={tableData} avgRespTime={avgRespTime} visible={isTableVisible} worstRespTime={worstRespTime} />)
    });
  }, [payloadData, isButtonClicked]);
  // console.log('IsButtonClicked: ', isButtonClicked);

 const onSubmitButtonClick = () => {
   const toSend = {
    'County': countyOption,
    'Start time': timeOption,
    'AM/PM': amPmOption,
    'num_ambulances': ambulanceCountOption,
    'calls_per_day': callsPerDay
   };
   console.log('Payload for GET optimal times call: ', toSend);
   setPayloadData(toSend);

  // Another way to set it??
  setIsButtonClicked(!isButtonClicked);
  setIsTableVisible(!isTableVisible);
 
  }

  return (
    <>
    <div >
    <InputGroup>
    <InputGroup.Text id="basic-addon1" >Census</InputGroup.Text>
    <select className="form-select" aria-label="Default select example"
    onChange={(event) => handleChangeCounty(event.target.value)}
    >    
        <option selected value='1'>1</option>
        <option value="Gwinnett">Gwinnett</option>
        <option value="Henry">Henry</option>
        <option value="Rockdale">Rockdale</option>
        <option value="Fayette">Fayette</option>
    </select>
    </InputGroup>
      <br />
    <InputGroup>
    <InputGroup.Text id="basic-addon1">Time of Day</InputGroup.Text>
    <select className="form-select"
    onChange={(event) => handleChangeTime(event.target.value)}>
        <option value = "12">12 to 1</option>
        <option value="1">1 to 2</option>
        <option value="2">2 to 3</option>
        <option value="3">3 to 4</option>
        <option selected value="4">4 to 5</option>
    </select>
    <select className="form-select"
    onChange={(event) => handleChangeAmPm(event.target.value)}>
        <option selected value="AM">AM</option>
        <option value="PM">PM</option>
    </select>
    </InputGroup>
      <br />
    <InputGroup>
        <InputGroup.Text id="basic-addon1">Number of Ambulances</InputGroup.Text>
        <Form.Control
          placeholder="20"
          aria-label="20"
          aria-describedby="basic-addon1"
          onChange={(event) => handleChangeAmbulanceCount(event.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Minimum Running Time</InputGroup.Text>
        <Form.Control
          placeholder="10"
          aria-label="10"
          aria-describedby="basic-addon1"
          onChange={(event) => handleChangeAmbulanceCount(event.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Total # of Calls Per Day</InputGroup.Text>
        <Form.Control
          placeholder="5"
          aria-label="5"
          aria-describedby="basic-addon1"
          onChange={(event) => handleChangeCallsCount(event.target.value)}
        />
      </InputGroup>
    </div>
    <br />
    <Button as="input" type="submit" value="Simulate"
    onClick = {onSubmitButtonClick}/>
    </>
  );
}
export default Filters;