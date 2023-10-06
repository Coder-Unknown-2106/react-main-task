import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
    const navigate = useNavigate()
    // handle password type and icons
    const [icon, setIcon] = useState(false)
    // validation using with useForm() hook
    const schema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),
        password: Yup.string().required('Password is required').trim()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });

    // Login Verficied Fuction
    function loginCheck(data) {
        const getAllUserData = JSON.parse(localStorage.getItem('userAccount') || '[]')
        const currentLog = getAllUserData.find((user) => (user.email === data.email) && (user.password === data.password))
        if (currentLog) {
            localStorage.setItem('logged', JSON.stringify(currentLog))
            // toastify notification
            toast.success("Login SuccessFully..!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            })
            // delay and navigate page
            setTimeout(() => {
                navigate('/dashBoard')
            }, 2000)

        } else {
            const checkEmail = getAllUserData.find((user) => user.email === data.email)
            // checking invalidate email 
            if (!checkEmail) {
                toast.error("Email is Invaild..!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
            }
            // checking invalidate password
            else {
                toast.error("Password is Invaild..!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
            }
        }

    }
    // Login Verficied Fuction end

    return (
        <div className='logPage'>
            <form onSubmit={handleSubmit(loginCheck)}>
                <div style={{ minHeight: '80vh' }} className=' container d-grid justify-content-center align-content-center  text-white' >
                    <div>
                        <h2 className=' text-center rounded my-5  p-2 loginHead'>Login Form</h2>
                        <div className="">
                            <label className='form-label' htmlFor=''>Email</label>
                            <input
                                name="email"
                                type="email"
                                {...register('email')}
                                className={`form-control mb-3 ${errors?.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors?.email?.message}</div>
                        </div>
                        <div className="invalid-feedback">{errors?.email?.message}</div>
                        <div>
                            <div>
                                <label htmlFor="password" className='form-label text-white'>Password</label>
                                <div className="input-group mb-3">
                                    <input
                                        type={icon ? 'text' : 'password'}
                                        className={`form-control ${errors?.password ? 'is-invalid' : ''
                                            }`}
                                        name='password'
                                        {...register('password')}
                                    />

                                    <span onClick={() => setIcon(!icon)} className="input-group-text" id="basic-addon1">{icon ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>

                                    <div className="invalid-feedback">{errors?.password?.message}</div>
                                </div>

                            </div>

                        </div>
                        <div className=' d-grid '>
                            <button type="submit" className=' registerBtn'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login