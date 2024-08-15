import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [department, setDepartment] = useState(null);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employee details
        axios.get(`http://localhost:9999/employees/${id}`)
            .then(res => {
                setEmployee(res.data);
                return axios.get(`http://localhost:9999/departments/${res.data.department}`);
            })
            .then(res => {
                setDepartment(res.data);
            })
            .catch(error => {
                console.error('Error fetching employee details', error);
            });

        // Fetch employee's projects
        axios.get("http://localhost:9999/projects")
            .then(res => {
                const empProjects = res.data.filter(p => p.employee_ids.includes(id));
                setProjects(empProjects);
            })
            .catch(error => {
                console.error('Error fetching projects', error);
            });
    }, [id]);

    if (!employee || !department) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Date of Birth:</strong> {employee.dob}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {department.name}</p>
            <p><strong>Projects:</strong> {projects.map(p => p.name).join(', ') || 'N/A'}</p>
            <Button variant="primary" onClick={() => navigate(`/edit-employee/${id}`)}>Edit</Button>
            <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>Back</Button>
        </Container>
    );
}

export default EmployeeDetail;
