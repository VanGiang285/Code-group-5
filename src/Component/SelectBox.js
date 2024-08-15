import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import React from "react";
function SelectBox(props){
    return(
        <div>
            <div>
            operator:
            <Form.Select  onChange={(e) => props.setOP(e.target.value)}>
              <option value="0">+</option>
              <option value="1">-</option>
              <option value="2">x</option>
              <option value="3">/</option>
            </Form.Select>
          </div>
        </div>
    )
}
export default SelectBox