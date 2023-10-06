import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiSolidShoppingBag } from "react-icons/bi";
import { useGetProductQuery } from '../../productApi/productApi'
import DataTable from 'react-data-table-component';
import { BsCartCheck } from "react-icons/bs";
const DashBoard = () => {
    // get current logic user 
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    const navigate = useNavigate()
    // Get All Data Using with RTK Query
    const { data: productData, isLoading, isSuccess, isError, error } = useGetProductQuery()
    // data table columns
    const columns = [
        {
            id: 0,
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            reorder: true
        },
        {
            id: 1,
            name: "Product_Images",
            cell: (row) => <img height={'40px'} src={row.images[0]} className='cardImg' alt="" />,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 2,
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "Description",
            selector: (row) => row.description.slice(0, 10),
            sortable: true,
            reorder: true
        },
        {
            id: 4,
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
            right: true,
            reorder: true
        }

    ];
    // data fetching using with reduxToolkit
    let content;
    // Loading status
    if (isLoading) {
        content = <p className='loadingData col-12'>Your Data Loading...</p>
    }
    // Succuess Status
    else if (isSuccess) {
        const getAllproductData = productData.products
        console.log(getAllproductData);
        content =
            <div className='container dashBoard'>
                <p className='text-center rounded-4 my-3 py-2 bg-dark text-white'><span className='fs-1' >Welcome </span><span className='text-pink fs-2'>{loginUser.name}</span></p>
                <div className=' d-flex justify-content-between my-3'>
                    <p>
                        <button onClick={() => navigate('/listProducts')} type="button" className='btn-pink me-2'>View Products <span className='fs-5'><BiSolidShoppingBag /></span></button>
                    </p>
                    <p>
                        <span className=' fw-bold fs-3'>Product_Count :</span> <span className='fs-6 badge registerBtn'>{getAllproductData.length}</span></p>
                    {/* <p>
                        <button type="button" onClick={() => navigate('/editDashBoard')} className='btn-pink'>Edit View Products</button>
                    </p> */}
                    <p>
                        <button type="button" onClick={() => navigate('/editDashBoard')} className='btn-pink'>View Cart Products <span className='fw-bold ms-1'><BsCartCheck /></span></button>
                    </p>
                </div>
                {/* <div className='row row-cols-1 row-cols-md-3 g-2 my-4'>
                {
                    getAllproductData.slice(0, 3).map((product, i) => (
                        <div className='col' key={product.id}>
                            <div className='card h-100'>
                                <img src={product.images[0]} className=' card-img cardImg' alt="" />
                                <h2 className=' card-header '>{product.brand}</h2>
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
                            </div>

                        </div>
                    ))
                }
            </div> */}
                {/* data-table-react */}
                <DataTable
                    className='dataTable'
                    title="Product Lists"
                    columns={columns}
                    data={getAllproductData.slice(0, 3)}
                    defaultSortFieldId={1}
                    pagination
                />

            </div>
    }
    // Error Status
    else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <>
            {content}
        </>

    )
}

export default DashBoard