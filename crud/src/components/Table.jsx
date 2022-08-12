import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Table = () => {
    const [apidata, setApiData] = useState([])
    const [flag, setFlag] = useState(false)
    const data = JSON.parse(localStorage.getItem('token'))
    console.log(data.isAdmin)

    const dataHandeler = () => {

        if (data.isAdmin == true) {
            axios.get("http://localhost:8090/auth/getAllUser").then((response) => {
                setApiData(response.data)
                setFlag(!flag)
            }).catch((err) => { console.log(err) })
        } else {
            axios.get(`http://localhost:8090/auth/getUser/${data._id}`).then((response) => {
                console.log(response.data)
                setApiData(response.data)
                setFlag(!flag)
            }).catch((err) => { console.log(err) })
        }
    }

    const deleteHandeler = (id) => {
        axios.delete(`http://localhost:8090/auth/deleteUser/${data._id}`).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        dataHandeler()
    }, [flag])
    return (
        <>
            <div className="container mt-2" style={{ width: "80%" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.isAdmin == true?
                            apidata.map((ele, i) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{ele.fname + " " + ele.lname}</td>
                                            <td>{ele.email}</td>
                                            <td>{ele.mobile}</td>
                                            <td className='d-felx justify-content-between'>
                                                <button className='btn btn-danger' onClick={() => deleteHandeler(ele._id)}><i className="fa-solid fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            :
                            <>
                                <th scope="row">{1}</th>
                                <td>{apidata.fname + " " + apidata.lname}</td>
                                <td>{apidata.email}</td>
                                <td>{apidata.mobile}</td>
                            </>}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
