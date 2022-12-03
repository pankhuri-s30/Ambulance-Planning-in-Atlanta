import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { Component } from 'react';
import { useState } from "react";
import { Table } from 'antd';
function  toTime(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}

const Results = ({tableData}) => {
  
    var state = {tableData: tableData};
    console.log('State inside Results component: ', state);

    const dataSources = []
    const num_of_vehicles = state.tableData?.mapping
    Object.keys(state.tableData?.response_time_per_tract).
    map((key, index) => (
      dataSources.push({key: key, id: key, time: toTime(state.tableData?.response_time_per_tract[key]), count: num_of_vehicles[key] || 0})
     ));
    console.log('Datasources: ', dataSources);
  
      
      const columns = [
        {
          title: 'Census ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '# of Ambulances',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: 'Response Time per Tract',
          dataIndex: 'time',
          key: 'time',
        },
      ];
      
  return (
    <>
    
    <div style={{marginTop: 30}}>
    <h4>Results:</h4>
    <hr />
    {/* <hr /> */}
    <div style={{color: "green"}}><b>Average response time: {toTime(state.tableData?.average_response_time)}</b></div> 
    <br />
    <div style={{color: "grey"}}><b>Worst case response time: {toTime(state.tableData?.worst_response_time)}</b></div> 
    </div>
    <br />
    <div style={{width: 600}}>
    <Table dataSource={dataSources} columns={columns} pagination={{ pageSize: 3 }}/>
    </div>
    </>
  );
}
export default Results;