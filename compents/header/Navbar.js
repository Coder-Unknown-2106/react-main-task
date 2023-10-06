import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaReact } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Swal from 'sweetalert2';
import { BsFillCartPlusFill } from "react-icons/bs";

const Navbar = () => {
    const navigate = useNavigate()
    // get Current loggedIn User Data
    const loggedUser = JSON.parse(localStorage.getItem('logged'))

    // current User Logout Funtion Logic
    function logOutSession() {
        // sweetHeart
        Swal.fire({
            title: 'Are You Sure Logout?',
            showCancelButton: true,
            confirmButtonText: 'LogOut',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Logged Out...!', '', 'success')
                localStorage.removeItem('logged')
                navigate('/')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark  text-white pt-3">
            <div className="container">
                <p className="fs-1 text-pink" role='button' onClick={() => navigate('/')} ><FaReact /></p>
                <button className="navbar-toggler  " type="button" data-bs-toggle="collapse" data-bs-target="#navbarControl" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse " id="navbarControl">
                    <ul className="navbar-nav ms-auto fw-bold  mb-2 mb-lg-0 nav-li-color">

                        {loggedUser ? <li role='button' onClick={() => navigate('/dashboard')} className="nav-item me-2 btn-pink">
                            DashBoard
                        </li> :
                            <li role='button' onClick={() => navigate('/register')} className="nav-item me-2  btn-pink">
                                Register
                            </li>
                        }

                        {loggedUser ?
                            <li role='button' onClick={() => logOutSession()} className="nav-item me-2  btn-pink ms-2">
                                Logout<span className=' ms-1'><BiLogOut /></span>
                            </li>
                            : <li role='button' onClick={() => navigate('/login')} className="nav-item me-2  btn-pink ms-2">
                                Login<span className=' ms-1'> <BiLogIn /></span>
                            </li>}

                        {loggedUser && <li role='button' className="nav-item me-2" >
                            <button type="button" class="btn-pink position-relative"><BsFillCartPlusFill />
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">0<span class="visually-hidden">unread messages</span></span>
                            </button>
                        </li>}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar




