import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Alertp from '../alert/Alert';

const Login = () => {
  const navigate = useNavigate()
  const [alert , setAlert] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ''
  })
  const onChangeHandeler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const onClickHandeler = () => {
    if (data.email.trim() === "" || data.password.trim() === "") {
      alert("Provide all fields corretly")
    } else {
      axios.post("http://localhost:8090/auth/", data).then((response) => {
        console.log(response.data)
        navigate('/home')
        localStorage.setItem('token', JSON.stringify(response.data))
        setAlert(false)
      }
      ).catch((err) =>
        console.log(err))
        setAlert(true)
      setData({
        email: "",
        password: ''
      })
    }
  }
  return (
    <div className="container">
      <Card sx={{ maxWidth: 475 }}>
        <CardContent>
          {alert &&
          < Alertp text="Invalid email or password!"/>
          }
          <Typography sx={{ fontsize: 14 }} style={{ marginLeft: "160px" }}
            color="text.secondary" gutterBottom>
            <h1> Login</h1>
          </Typography>
          <Typography variant="h3" component="div" className="fields" style={{ marginTop: '10px' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }}
              name='email' onChange={onChangeHandeler} value={data.email}
              label="Your Email" variant="outlined" />
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }}
              name='password' onChange={onChangeHandeler}
              value={data.password} label="Your Password"
              variant="outlined" />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ width: '32vw', marginLeft: '3px' }}
            onClick={onClickHandeler} variant='contained'>
            Login
          </Button>
          <br />
        </CardActions>
        <Typography style={{ marginLeft: "220px" }}>
          or
        </Typography>
        <CardActions>
          <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
            <Button size="small" sx={{ width: '32vw', marginLeft: '3px' }}
              variant='contained'>
              Register
            </Button>
          </Link>
          <br />
        </CardActions>
      </Card>
    </div>
  )
}

export default Login
