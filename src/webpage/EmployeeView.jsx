import React, { useEffect, useState } from 'react'
import axios from 'axios'

function EmployeeView(props) {
    // Hook
    const [inputValueName, setInputValueName] = useState('')
    const [inputValueAddress, setInputValueAddress] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    // Handle
    const handleSubmit = (event) => {
        event.preventDefault()
        fetchData()
    }
    const handleInputChangeName = (event) => {
        setInputValueName(event.target.value)
    }
    const handleInputChangeAddress = (event) => {
        setInputValueAddress(event.target.value)
    }

    // Call API
    const fetchData = async () => {
        await axios
            .get('http://localhost:9999/tds/getEmployee', {
                params: {
                    name: inputValueName,
                    address: inputValueAddress,
                },
            })
            .then(function (response) {
                // handle success
                setData(response.data)
                console.log('data: ', typeof response.data)
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Employee Name:
                        <input
                            type="text"
                            value={inputValueName}
                            onChange={handleInputChangeName}
                        ></input>
                    </label>
                    <br />
                    <label>
                        Employee Address:
                        <input
                            type="text"
                            value={inputValueAddress}
                            onChange={handleInputChangeAddress}
                        ></input>
                    </label>
                    <br />
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </form>
            </div>

            <table className="table table-hover table-striped">
                <thead className="thead-light">
                    <tr>
                        <th>employee id</th>
                        <th>employee name</th>
                        <th>employee phone</th>
                        <th>employee email</th>
                        <th>employee address</th>
                        <th>employee hire date</th>
                        <th>employee end date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_phone}</td>
                            <td>{employee.employee_email}</td>
                            <td>{employee.employee_address}</td>
                            <td>{employee.employee_hire_date}</td>
                            <td>{employee.employee_end_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeView
