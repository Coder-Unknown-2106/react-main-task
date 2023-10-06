import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BsFillCartCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const AddProduct = () => {
    const schema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required').matches(/[a-zA-Z]/, "Letters only Aceept").min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
        productPrice: Yup.string().required('Product Priceis required').matches(/^\d*[1-9]\d*$/, "Only Positive value Accept").trim(),
        productQuanity: Yup.string().matches(/^\d*[1-9]\d*$/, "Only Positive value Accept").required('Product Priceis required').trim(),

    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });

    const navigate = useNavigate()
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    function addProduct(data) {
        const getVal = JSON.parse(localStorage.getItem(`${loginUser.email} products`) || '[]')
        const id = getVal.length ? getVal[getVal.length - 1].id + 1 : 1
        localStorage.setItem(`${loginUser.email} products`, JSON.stringify([...JSON.parse(localStorage.getItem(`${loginUser.email} products`)) || [],
        {
            id,
            productName: data.productName,
            productPrice: data.productPrice,
            productQuanity: data.productQuanity,
        }
        ]))
        reset()
        toast.success("Product Added..!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
        })
        setTimeout(() => {
            navigate('/viewListProducts')
        }, 2000)

    }
    return (
        <div className='productAdd'>
            <form onSubmit={handleSubmit(addProduct)}>
                <div className=" d-grid text-white justify-content-center py-5">
                    <h1 className="text-center mb-3 loginHead py-2 rounded-2 ">Product Add</h1>
                    <div>
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="ProductName"
                            {...register('productName')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productName?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="form-label">Product Quantity</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productName ? 'is-invalid' : ''
                            }`} name="" id="quantity"
                            {...register('productPrice')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productPrice?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input type="text" className={`form-control mb-3 ${errors?.productQuanity ? 'is-invalid' : ''
                            }`} name="" id="price"
                            {...register('productQuanity')}
                        />
                        <div className="invalid-feedback mb-2">
                            {errors?.productQuanity?.message}
                        </div>
                    </div>
                    <button className="registerBtn my-3">ADD PRODUCT <span className=' ms-1 fs-5'><BsFillCartCheckFill /></span></button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct