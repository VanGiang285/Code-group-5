import axios from 'axios';
import { Row, Col, Table, Form, Container, Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [projects, setProjects] = useState([]);
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Thay đổi để quản lý tìm kiếm
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9999/employees")
            .then(res => {
                setEmployees(res.data);
                setFilterEmployees(res.data);
            })
            .catch(error => {
                console.error('Error fetching employees', error);
            });

        axios.get("http://localhost:9999/departments")
            .then(res => {
                setDepartments(res.data);
            })
            .catch(error => {
                console.error('Error fetching departments', error);
            });

        axios.get("http://localhost:9999/projects")
            .then(res => {
                setProjects(res.data);
            })
            .catch(error => {
                console.error('Error fetching projects', error);
            });
    }, []);

    const handleDepartmentSelect = (e) => {
        const departmentId = e.target.value;
        setSelectedDepartment(departmentId);
        filterData(departmentId, searchQuery);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterData(selectedDepartment, query);
    };

    const filterData = (departmentId, query) => {
        let filtered = employees;

        if (departmentId) {
            filtered = filtered.filter(emp => emp.department.toString() === departmentId);
        }

        if (query) {
            filtered = filtered.filter(emp => emp.name.toLowerCase().includes(query.toLowerCase()));
        }

        setFilterEmployees(filtered);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`http://localhost:9999/employees/${id}`)
                .then(res => {
                    axios.get("http://localhost:9999/employees")
                        .then(res => {
                            setEmployees(res.data);
                            setFilterEmployees(res.data);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const getDepartmentName = (departmentId) => {
        const department = departments.find(d => d.id.toString() === departmentId.toString());
        return department ? department.name : 'N/A';
    };

    const getProjectNames = (employeeId) => {
        const employeeProjects = projects.filter(p => p.employee_ids.includes(employeeId.toString()));
        return employeeProjects.map(p => p.name).join(', ') || 'N/A';
    };

    return (
        <Container className="container-custom">
            <Row className="my-4">
                <Col md={4}>
                    <h2>Departments</h2>
                    <Form.Select 
                        className="form-select-custom" 
                        aria-label="Select department" 
                        onChange={handleDepartmentSelect} 
                        value={selectedDepartment}>
                        <option value=''>All Departments</option>
                        {departments.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </Form.Select>
                    <Button variant='outline-success' className='mt-3' onClick={() => navigate('/add-employee')}>
                        Add
                    </Button>
                </Col>

                <Col md={8}>
                    <h2>List Employees</h2>
                    <Form.Control 
                        type="text" 
                        placeholder="Search by name" 
                        value={searchQuery}
                        onChange={handleSearch}
                        className="mb-3"
                    />
                    <Table hover className="table-custom">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Project</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterEmployees.map((i) => (
                                <tr key={i.id}>
                                    <td>{i.name}</td>
                                    <td>{i.dob}</td>
                                    <td>{i.gender}</td>
                                    <td>{i.position}</td>
                                    <td>{getDepartmentName(i.department)}</td>
                                    <td>{getProjectNames(i.id)}</td>
                                    <td className="button-group">
                                        <Button variant='primary' onClick={() => navigate(`/employee/${i.id}`)}>View</Button>
                                        <Button variant='success' onClick={() => navigate(`/edit-employee/${i.id}`)}>Update</Button>
                                        <Button variant='danger' onClick={() => handleDelete(i.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
