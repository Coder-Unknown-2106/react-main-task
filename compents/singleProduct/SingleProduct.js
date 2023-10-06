import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../productApi/productApi'
import ShowModal from '../../bootstrapComponents/ShowModal'

const SingleProduct = () => {
    const navigate = useNavigate()

    // get Specific ID 
    const { id } = useParams()

    // Get All Data using with RTK query
    const { data: productData, isLoading, isSuccess, error } = useGetProductQuery()

    // set let variable because this data will changeable
    let content;
    // Loading data
    if (isLoading) {
        content = <p>Your Data Loading...!</p>
    }
    // Success data 
    else if (isSuccess) {
        const getAllproductData = productData.products
        const product = getAllproductData.find((product) => product.id === Number(id))
        content = <div className='card  h-100 ' style={{ width: '20rem' }} >
            <img role='button' src={product.images[0]} className=' card-img cardImg' alt="" />
            <h2 role='button' className=' card-header '>{product.brand}</h2>
            <div className=' card-body'>
                <div className=' d-flex justify-content-between'>
                    <p><span className=' fw-semibold'>DisCount:</span> <span className=' badge bg-danger text-white p-1'>
                        {product.discountPercentage}%</span></p>
                    <p><span className='fw-semibold'>Discount Price:</span> <span className=' badge bg-primary text-white p-1 fs-6'>
                        ${product.price}</span></p>
                </div>
                <div>
                    {product.description}
                </div>

            </div>
            <div className=' card-footer d-grid'>
                <ShowModal
                    title={product.brand}
                    productId={product.id} />
            </div>
        </div>
    }
    //Error Data
    else {
        content = <p>{error}</p>
    }

    return (
        <main className=' d-grid justify-content-center  bg-secondary py-5'>
            {content}
            <button type="button" onClick={() => navigate('/listProducts')} className='mt-4 registerBtn'>Back To Lists</button>
        </main >
    )
}

export default SingleProduct