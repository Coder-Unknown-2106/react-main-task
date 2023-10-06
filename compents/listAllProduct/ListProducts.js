import React from 'react'
import { useGetProductQuery } from '../../productApi/productApi'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

const ListProducts = () => {
    const navigate = useNavigate()
    // Get All Data Using with RTK Query
    const { data: productData, isLoading, isSuccess, isError, error } = useGetProductQuery()
    // data table colunms
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
        content = <DataTable
            className='dataTable'
            title="Product Lists"
            columns={columns}
            data={getAllproductData}
            defaultSortFieldId={1}
            pagination
        />
    }
    // Error Status
    else if (isError) {
        content = <p>{error}</p>
    }

    return (

        <>
            <div className='container listProduct'>
                {content}
            </div>
        </>

    )
}

export default ListProducts