import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import React from "react";
function TableList(props){
    return(
        <div>
            List of operations
          <Table striped bordered hover border={1}>
            <thead>
              <tr>
                <th>a</th>
                <th>b</th>
                <th>operator</th>
                <th>result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.a}</td>
                  <td>{item.b}</td>
                  <td>{item.op}</td>
                  <td>{item.result}</td>
                  <td><a href="#" onClick={() => props.handleSelect(item)}>Select</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    )
}
export default TableList;