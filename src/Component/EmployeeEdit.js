import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

function EmployeeEdit() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        dob: '',
        gender: '',
        position: '',
        department: ''
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employee details
        axios.get(`http://localhost:9999/employees/${id}`)
            .then(res => {
                setEmployee(res.data);
            })
            .catch(error => {
                console.error('Error fetching employee details', error);
            });

        // Fetch departments
        axios.get("http://localhost:9999/departments")
            .then(res => {
                setDepartments(res.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Show confirmation dialog
        if (window.confirm('Are you sure you want to save the changes?')) {
            // Update employee details
            axios.put(`http://localhost:9999/employees/${id}`, employee)
                .then(res => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error updating employee details', error);
                });
        }
    };

    return (
        <Container>
            <h2>Edit Employee</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={employee.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formDOB" className='mb-3'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="dob" 
                        value={employee.dob} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formGender" className='mb-3'>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select 
                        name="gender" 
                        value={employee.gender} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formPosition" className='mb-3'>
                    <Form.Label>Position</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="position" 
                        value={employee.position} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formDepartment" className='mb-3'>
                    <Form.Label>Department</Form.Label>
                    <Form.Select 
                        name="department" 
                        value={employee.department} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Save</Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>Cancel</Button>
            </Form>
        </Container>
    );
}

export default EmployeeEdit;
