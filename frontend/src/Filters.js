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


const Filters = ({setAmbulanceMapping}) => {
  const [countyOption, setCountyOption] = useState("1");
  const [timeOption, setTimeOption] = useState("1");
  const [amPmOption, setAmPmOption] = useState("AM");
  const [ambulanceCountOption, setAmbulanceCountOption] = useState(20);
  const [maxRunningTimeOption, setMaxRunningTimeOption] = useState(30);
  const [callsPerDay, setcallsPerDay] = useState(2000);
  const [tableData, setTableData] = useState([]);
  const [avgRespTime, setAvgRespTime] = useState(0);
  const [worstRespTime, setWorstRespTime] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [hospData, setHospData] = useState([]);
  const [payloadData, setPayloadData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect((payload = {}) => {
    
  }, [payloadData, isButtonClicked]);
  // console.log('IsButtonClicked: ', isButtonClicked);

 const onSubmitButtonClick = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      const toSend = {
        'num_ambulances': ambulanceCountOption,
        //'min_time': 0,
        //'max_time': 0,
        'calls_per_day': callsPerDay,
        'max_runtime': maxRunningTimeOption,
      };
      axios.get(`http://127.0.0.1:5000/getOptimalPlacement`, {params: toSend}).then(response => {
        var table = response.data;
        setTableData(table);
        setAvgRespTime(response.data?.average_response_time);
        setWorstRespTime(response.data?.worst_response_time);
        setAmbulanceMapping(response.data?.mapping);
        setIsButtonClicked(false);
        setIsTableVisible(true);
      }).catch(e => {setIsButtonClicked(false)});
    }
  }

  console.log('tableData', tableData);

  return (
    <>
    <div >
    <InputGroup>
    <InputGroup.Text id="basic-addon1" >Census</InputGroup.Text>
    <select className="form-select" aria-label="Default select example"
    onChange={(event) => setCountyOption(event.target.value)}
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
    onChange={(event) => setTimeOption(event.target.value)}>
        <option value = "12">12 to 1</option>
        <option value="1">1 to 2</option>
        <option value="2">2 to 3</option>
        <option value="3">3 to 4</option>
        <option selected value="4">4 to 5</option>
    </select>
    <select className="form-select"
    onChange={(event) => setAmPmOption(event.target.value)}>
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
          onChange={(event) => setAmbulanceCountOption(event.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Maximum Running Time</InputGroup.Text>
        <Form.Control
          placeholder="30"
          aria-label="30"
          aria-describedby="basic-addon1"
          onChange={(event) => setMaxRunningTimeOption(event.target.value)}
        />
      </InputGroup>
      <br />
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Total # of Calls Per Day</InputGroup.Text>
        <Form.Control
          placeholder="2000"
          aria-label="2000"
          aria-describedby="basic-addon1"
          onChange={(event) => setcallsPerDay(event.target.value)}
        />
      </InputGroup>
    </div>
    <br />
    <Button as="input" type="submit" value="Simulate" disabled={isButtonClicked}
    onClick = {onSubmitButtonClick}/>
    {isTableVisible && <Results tableData={tableData} avgRespTime={avgRespTime} visible={isTableVisible} worstRespTime={worstRespTime} />}
    </>
  );
}
export default Filters;