import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [genders, setGenders] = useState([]);
    const [positions, setPositions] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9999/departments")
            .then(res => {
                setDepartments(res.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });
        axios.get("http://localhost:9999/positions")
            .then(res => {
                setPositions(res.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });
        axios.get("http://localhost:9999/genders")
            .then(res => {
                setGenders(res.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            name,
            dob,
            gender,
            position,
            department
        };

        axios.post("http://localhost:9999/employees", newEmployee)
            .then(res => {
                alert('Employee added successfully');
                navigate('/');
            })
            .catch(error => {
                console.error('Error adding employee', error);
            });
    };

    return (
        <Container>
            <h2>Add New Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter employee name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        aria-label="Select gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value=''>Choose a gender</option>
                        {genders.map((g, index) => (
                            <option key={index} value={g.name}>{g.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                        aria-label="Select position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    >
                        <option value=''>Choose a position</option>
                        {positions.map((p, index) => (
                            <option key={index} value={p.name}>{p.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        aria-label="Select department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value=''>Choose a department</option>
                        {departments.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Employee
                </Button>
                <Button variant="success" onClick={() => navigate(`/`)}>
                    Back
                </Button>
            </Form>
        </Container>
    );
}

export default AddEmployee;
