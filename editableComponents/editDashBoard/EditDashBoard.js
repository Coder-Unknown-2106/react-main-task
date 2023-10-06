import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiSolidShoppingBag } from "react-icons/bi";

const EditDashBoard = () => {
    const navigate = useNavigate()
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    const getAllproductData = JSON.parse(localStorage.getItem(`${loginUser.email} products`) || '[]')
    return (
        <div className=' container'>
            <p className='text-center rounded-4 my-3 py-2 bg-dark text-white'><span className='fs-1' >Welcome </span><span className='text-pink fs-2'>{loginUser.name}</span></p>

            <div className='d-flex justify-content-between'>
                <p>
                    <button className='btn-pink' type="button" onClick={() => navigate('/viewListProducts')}>View Products<BiSolidShoppingBag /></button>
                </p>
                <p>
                    <span className=' fw-bold fs-3'>Product_Count :</span> <span className='fs-4'>{getAllproductData.length ? getAllproductData.length : 0}</span></p>
                <p>
                    <button onClick={() => navigate('/addProducts')} className='btn-pink' type="button">Add Products <BsFillCartCheckFill /></button>
                </p>
            </div>
            <div className=' container my-5'>
                {getAllproductData.length > 0 ?
                    <table className=' table table-bordered'>
                        <thead className='tableHead pt-3'>
                            <th>ProductName</th>
                            <th>ProductQuantity</th>
                            <th>ProductPrice</th>
                        </thead>
                        <tbody>
                            {getAllproductData.slice(0, 3).map((product) => (
                                <tr key={product.id} style={{ minHeight: '100px' }}>
                                    <td>{product.productName}</td>
                                    <td>{product.productQuanity}</td>
                                    <td>{product.productPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    :
                    <div className='text-center'>
                        <p className='fs-1 fw-bold'>No Items...</p>
                    </div>
                }




            </div>
        </div >
    )
}

export default EditDashBoard