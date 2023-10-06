import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import noData from '../../../Images/41830442__1_-removebg-preview.png'

const EditListProducts = () => {
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    const navigate = useNavigate()
    const getAllProducts = JSON.parse(localStorage.getItem(`${loginUser.email} products`) || '[]')
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loginUser.email} products`) || '[]'));
    const updateItems = (newItems) => {
        setProductList(newItems);
        localStorage.setItem(`${loginUser.email} products`, JSON.stringify(newItems));
    }
    // deleteProduct
    const handleDeleteList = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const deleteListUpdate = productList.filter((product) => product.id !== id)
                updateItems(deleteListUpdate)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

            }
        })
    }
    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1  //RDT provides index by default
        },
        {
            id: 1,
            name: "Product Name",
            selector: (row) => row.productName,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "Product Price",
            selector: (row) => row.productPrice,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "Product Quanity",
            selector: (row) => row.productQuanity,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: "Change",
            cell: (row) => <button onClick={() => navigate(`edit/${row.id}`)} className='btn btn-primary '> Edit <AiFillEdit /></button>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 5,
            name: "Action",
            cell: (row) => <button className='btn btn-danger' onClick={() => handleDeleteList(row.id)} >Delete<AiOutlineDelete /> </button>,
            sortable: true,
            right: true,
            reorder: true
        }
    ];

    return (

        <div className=' container-fluid'>
            <div className='d-flex justify-content-between my-5'>
                <button onClick={() => navigate('/editDashBoard')} className="btn-pink">DashBoard</button>
                <button onClick={() => navigate('/addProducts')} className="btn-pink">Add Products <BsFillCartCheckFill /></button>
            </div>
            {
                getAllProducts.length ?
                    <DataTable
                        title="Products Lists"
                        columns={columns}
                        data={getAllProducts}
                        defaultSortFieldId={1}
                        pagination
                    /> : <div className='text-center'>
                        <p className='fs-1 fw-bold'>No Items...</p>
                        <img src={noData} alt="" />
                    </div>
            }
        </div>
    );
}

export default EditListProducts