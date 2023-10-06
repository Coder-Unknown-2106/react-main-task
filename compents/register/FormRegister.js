import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from 'react';

const FormRegister = () => {
    const navigate = useNavigate()
    // using state for password filed Type change and Icon
    const [icon, setIcon] = useState(false)
    // form validation rules
    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required').matches(/[a-zA-Z]/, "Letters only Aceept").min(5, 'Name must be at least 5 characters').max(20, 'Name lessthan 16 characters').trim(),
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),
        password: Yup.string().required('Password is required').matches(/[A-Z]/, 'Please Give One UpperCase Letter').matches(/[0-9]/, 'Please One Number').matches(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/, 'Please Give Special Character.. like @#$').trim().min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required').trim(),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
    });

    // functions to build  useForm() hook
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });
    // functions to build  useForm() hook end

    // Form Register Fuction Start
    function onSubmit(data) {
        const getUserData = JSON.parse(localStorage.getItem('userAccount') || '[]')
        const id = getUserData.length ? getUserData[getUserData.length - 1].id + 1 : 1
        const exisitingUser = getUserData.find((user) => user.email === data.email)
        if (exisitingUser) {
            toast.error("User Already Exiting..!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            reset({ email: '' })
            return
        }
        // localStoage SetValues
        localStorage.setItem('userAccount', JSON.stringify([...JSON.parse(localStorage.getItem('userAccount')) || [],
        {
            id,
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }
        ]))
        // Register Success Notification
        toast.success("Register SuccessFully..!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }
    // Form Register Fuction end
    return (
        <div className='registerBgImg'>
            <div className=' container d-grid justify-content-lg-start p-0'>
                <div style={{ width: '20rem' }} className="card  m-5 bg-secondary bg-opacity-50 text-white">
                    <h5 className="card-header text-center bg-dark txt rounded-2">
                        Register Form
                    </h5>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div>
                                <div>
                                    <label htmlFor='' className='form-label'>Name</label>
                                    <input type="text" name="name" id=""
                                        {...register('name')}
                                        className={`form-control mb-3 ${errors?.name ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <div className="invalid-feedback">{errors?.name?.message}</div>
                                </div>

                            </div>
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

                                <div>
                                    <label htmlFor="confirmPassword" className='form-label text-white'>Confirm Password</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type={icon ? 'text' : 'password'}
                                            className={`form-control ${errors?.confirmPassword ? 'is-invalid' : ''
                                                }`}
                                            name='confirmPassword'
                                            {...register('confirmPassword')}
                                        />

                                        <span onClick={() => setIcon(!icon)} className="input-group-text" id="basic-addon1">{icon ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>

                                        <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group form-check">
                                <input
                                    name="acceptTerms"
                                    type="checkbox"
                                    {...register('acceptTerms')}
                                    id="acceptTerms"
                                    className={`form-check-input mb-3 ${errors?.acceptTerms ? 'is-invalid' : ''
                                        }`}
                                />
                                <label htmlFor="acceptTerms" className="form-check-label mb-3">
                                    Accept Terms & Conditions
                                </label>
                                <div className="invalid-feedback">
                                    {errors?.acceptTerms?.message}
                                </div>
                            </div>
                            <div className="d-grid">
                                <button disabled={!isValid} type="submit" className="registerBtn me-1">
                                    Register <span className=' ms-1 fs-5'><BiLinkExternal /></span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormRegister
