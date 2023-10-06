import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGetProductQuery } from '../productApi/productApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ShowModal({ title, productId }) {
    const navigate = useNavigate()
    // get user data
    const loginUser = JSON.parse(localStorage.getItem('logged'))
    // get all product data using with RTK query()
    const { data: productData, isSuccess, isError, error } = useGetProductQuery()
    const getAllproductData = productData.products
    // modal logic state
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // product added function
    const handleAddProduct = () => {
        // getExitingProduct
        if (isSuccess) {
            const getAddToCartProducts = JSON.parse(localStorage.getItem(`${loginUser.email}addTocart`) || '[]')
            const exitingProduct = getAddToCartProducts.find((product) => product.id === productId)
            if (exitingProduct) {
                toast.warning("OOPS...Sorry ,You Are Already Added..!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
                return
            }
            // getExitingProduct end

            // add New ITem In LocalStorage
            const addToCartItem = getAllproductData.find((product) => product.id === productId)
            setShow(true)
            localStorage.setItem(`${loginUser.email}addTocart`, JSON.stringify([...JSON.parse(localStorage.getItem(`${loginUser.email}addTocart`) || '[]'), addToCartItem]))
            navigate('/listProducts')
        }
    }
    //  product added function end

    return (
        <>
            {isSuccess &&
                <>
                    <Button variant="primary" onClick={handleAddProduct}>
                        ADD TO CART
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className=' text-success'>SucceesFully Added</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>  <p> Your Are Added: <span className=' fw-bold'>{title}</span></p></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </>
            }

            {isError && <p>{error}</p>}
        </>


    );
}

export default ShowModal;