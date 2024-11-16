import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      userName: '',
      email: '',
      country: '',
      mobileNumber: '',
      password: '',
   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   function isValidEmail(email) {
      // Regular expression to validate email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      // Test the email against the regex and return the result
      return emailRegex.test(email);
    }

   const handleClick = async e => {
      e.preventDefault()

      const checkEmail =  isValidEmail(credentials.email)

      if (!checkEmail) {
         alert('Email is not valid.')
         return
      }

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            body: JSON.stringify(credentials)
         })
         const result = await res.json()

         if(!res.ok) {
            alert(result.message)
            return;
         }

         dispatch({type:'REGISTER_SUCCESS'})
         navigate('/login')
      } catch(err) {
         alert(err.message)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="text" placeholder='Country' id='country' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="number" placeholder='Mobile Number' id='mobileNumber' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <button className='btn secondary__btn auth__btn' type='submit'>Create Account</button>
                        </form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Register