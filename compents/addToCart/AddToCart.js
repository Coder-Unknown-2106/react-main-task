import React from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { BiSolidShoppingBag } from "react-icons/bi";

const AddToCart = () => {
    const navigate = useNavigate()
    // get Local Storage user and addtoCart Items
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    const getAddToCartProducts = JSON.parse(localStorage.getItem(`${loginUser.email}addTocart`) || '[]')
    // data-table-columns
    const columns = [
        {
            id: 0,
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            reorder: true
        },
        {
            id: 5,
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
        },
        {
            id: 5,
            name: "More Details",
            cell: (row) => <button className='btn-pink' type="button" onClick={() => navigate(`product/${row.id}`)}>More</button>,
            sortable: true,
            right: true,
            reorder: true
        }

    ];
    return (
        <div className='container addCart'>
            <div>
                <p className='my-3'>
                    <button onClick={() => navigate('/listProducts')} type="button" className='btn-pink me-2'>Go to View Products <span className='fs-5'><BiSolidShoppingBag /></span></button>
                </p>

            </div>
            <DataTable
                className='dataTable'
                title="Your Cart Lists"
                columns={columns}
                data={getAddToCartProducts}
                defaultSortFieldId={1}
                pagination
            />
        </div>
    )
}

export default AddToCart