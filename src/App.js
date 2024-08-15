import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Data from './Data';
import { useState } from 'react';
import InputText from './Component/InputText';
import TableList from './TableList';
import SelectBox from './Component/SelectBox';
import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './Component/AddEmployee';
import EmployeeDetail from './Component/EmployeeDetail';
import EmployeeEdit from './Component/EmployeeEdit';
function App() {
  // const [data, setData] = useState(Data);
  // const [a, setA] = useState("");
  // const [b, setB] = useState("");
  // const [op, setOP] = useState("0");
  // const [result, setResult] = useState("");

  // // Arithmetic operations
  // const Excute = () => {
  //   let result, operator = "";
  //   if (op === "0") {
  //     result = parseInt(a) + parseInt(b);
  //     operator = "cong";
  //   } else if (op === "1") {
  //     result = parseInt(a) - parseInt(b);
  //     operator = "tru";
  //   } else if (op === "2") {
  //     result = parseInt(a) * parseInt(b);
  //     operator = "nhan";
  //   } else if (op === "3") {
  //     result = parseInt(a) / parseInt(b);
  //     operator = "chia";
  //   }
  //   setResult(result);
  //   setData([...data, { a, b, op: operator, result }]);
  // };

  // // UCLN and BCNN calculations
  // const Execute2 = (e) => {
  //   let result = "", operator = "";
  //   if (e.target.value === "0") {
  //     result = UCLN(parseInt(a), parseInt(b));
  //     operator = "UCLN";
  //   } else if (e.target.value === "1") {
  //     result = BCNN(parseInt(a), parseInt(b));
  //     operator = "BCNN";
  //   }
  //   setResult(result);
  //   setData([...data, { a, b, op: operator, result }]);
  // };

  // function UCLN(a, b) {
  //   while (a !== b) {
  //     if (a > b) {
  //       a = a - b;
  //     } else {
  //       b = b - a;
  //     }
  //   }
  //   return a;
  // }

  // function BCNN(a, b) {
  //   return (a * b) / UCLN(a, b);
  // }

  // // Hàm xử lý khi nhấn vào "Select"
  // const handleSelect = (item) => {
  //   setA(item.a);
  //   setB(item.b);
  //   const operatorMap = { "cong": "0", "tru": "1", "nhan": "2", "chia": "3", "UCLN": "0", "BCNN": "1" };
  //   setOP(operatorMap[item.op]);
  //   setResult(item.result);
  // };
  // const [selectedItem,setSelectedItem] = useState("");
  // const SelectedChange = (item) =>{
  //   setSelectedItem(item)
  // }
  return (
    <div className="App">
      {/* <Row>
        <Col sm={5}>
         <InputText message="Enter a:" value={a} setValue = {setA}></InputText>
         <InputText message="Enter b:" value={b} setValue = {setB}></InputText>
          <SelectBox setOP={setOP}></SelectBox>
          <div>
            operator2:
            <Form.Check inline type='radio' label="UCLN" name='op2' onChange={Execute2} value="0" />
            <Form.Check inline type='radio' label="BCNN" name='op2' onChange={Execute2} value="1" />
          </div>
          <div>
            Result: <input type="text" value={result} className="form-control" readOnly />
          </div>
          <div>
            <Button variant='outline-success' onClick={Excute}>Excute</Button>
          </div>
        </Col>
        <Col sm={7}>
         <TableList data={data} handleSelect={handleSelect}></TableList>
        </Col>
      </Row> */}
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/employee/:id" element={<EmployeeDetail />} />
                <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
