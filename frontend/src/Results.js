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
const Results = ({tableData}) => {
    var state = {tableData: tableData};
    console.log('State inside Results component: ', state);
    const dataSource = [
        {
          key: '1',
          id: 1,
          count: 32,
          time: 9.5,
        },
        {
          key: '2',
          id: 2,
          count: 42,
          time: 10.5,
        },
        {
            key: '3',
            id: 3,
            count: 32,
            time: 9.5,
        },
        {
        key: '4',
        id: 4,
        count: 42,
        time: 10.5,
        },
        {
            key: '5',
            id: 5,
            count: 10,
            time: 12.5,
            },
      ];
      
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
    
    <div className="float-container">
    <hr />
    <hr />
    <div class="float-child-left"><b>Average response time: {state.tableData?.average_response_time}</b></div> 
    <div class="float-child"><b>Worst case response time: {state.tableData?.worst_response_time}</b></div> 
    </div>
    <div style={{width: 500, marginLeft: 30}}>
    <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }}/>
    </div>
    </>
  );
}
export default Results;