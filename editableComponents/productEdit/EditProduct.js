import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillCartCheckFill } from "react-icons/bs";
const EditProduct = () => {
    const { id } = useParams()
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem(`${loginUser.email} products`) || '[]'))
    const navigate = useNavigate()

    const getSingleItem = productList.find((product) => product.id === Number(id))


    const schema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
        productPrice: Yup.string().matches(/^\d*[1-9]\d*$/, "Only Positive value Accept").required('Product Priceis required').trim(),
        productQuanity: Yup.string().matches(/^\d*[1-9]\d*$/, "Only Positive value Accept").required('Product Priceis required').trim(),

    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });
    const updateItems = (newItems) => {
        setProductList(newItems)
        localStorage.setItem(`${loginUser.email} products`, JSON.stringify(newItems));
    }

    function addProduct(data) {

        const editProduct = productList.map((product) => product.id === Number(id) ? { id: product.id, productName: data.productName, productPrice: data.productPrice, productQuanity: data.productQuanity } : product)
        updateItems(editProduct)
        // reset()
        toast.info("Product Update Successfull..!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        });
        setTimeout(() => {
            navigate('/viewListProducts')
        }, 2000)

    }

    return (
        <div className='editProduct container-fluid'>
            <form onSubmit={handleSubmit(addProduct)}>
                <div className=" d-grid text-white justify-content-center py-5">
                    <h1 className="text-center mb-3 px-1 loginHead py-2 rounded-2 ">Product Update</h1>
                    <div>
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="ProductName"
                            {...register('productName')}
                            defaultValue={getSingleItem.productName}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productName?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="form-label">Product Quantity</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="quantity"
                            {...register('productQuanity')}
                            defaultValue={getSingleItem.productQuanity}

                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productQuanity ? 'is-invalid' : ''
                            }`} name="" id="price"
                            {...register('productPrice')}
                            defaultValue={getSingleItem.productPrice}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <button className="registerBtn my-3">UPDATE PRODUCT <span className='ms-1 fs-5'><BsFillCartCheckFill /></span></button>
                </div>
            </form>
        </div>
    )
}

export default EditProduct