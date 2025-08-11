import { Container } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { removeCartItem } from "../../Store/ProductSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Cart() {
    const cartItem = useSelector((state) => state.product.cartItem);
    const [total, setTotal] = useState(0);
    const [productDet, setProductDet] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRemove = (id) => {
        dispatch(removeCartItem(id));
    }
    useEffect(() => {
        if (cartItem.length === 0) {
            setProductDet([]);
            setTotal(0);
            setLoading(false);
            return;
        }

        const fetchAllProductDet = async () => {
            try {
                setLoading(true)
                const req = cartItem.map((item) => (
                    fetch(`https://dummyjson.com/products/${item.id}`).then(res => res.json())
                ));

                const result = await Promise.all(req);
                setProductDet(result);

                const calculatedTotal = result.reduce((acc, item) => acc + item.price, 0);
                setTotal(calculatedTotal);
            } catch (error) {
                console.error("Failed to fetch cart items : ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllProductDet();
    }, [cartItem])

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <ClipLoader color='yellow' size={100} />
            </Container>
        )
    }
    return (
        <>
            {
                cartItem.length === 0 ?
                    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ width: "100%", height: "80vh" }}>
                        <h3>Your cart is empty</h3>
                        <p>Please add items to proceed further.</p>
                        <button onClick={() => navigate("/")} className="gotoHomepage">Go to Home page</button>
                    </Container>
                    :
                    <Container fluid className="cart-container">
                        <div >
                            <h1>Shopping Cart</h1>
                            <div className="cart-items-list">
                                {
                                    productDet.map((item, index) => (
                                        <div key={index} className="cart-item" >
                                            <div className="d-flex" style={{cursor: "pointer"}} onClick={() => navigate(`/product/${item.id}`)}>
                                            <img src={item.thumbnail} />
                                            <div className="item-details">
                                                <p>{item.title}</p>
                                                <p>{item.brand}</p>
                                                <span>${item.price}</span> <span>{item.discountPercentage}% OFF</span>
                                                <p>{item.availabilityStatus}</p>
                                            </div>
                                            </div>
                                            <div className=" icon-div" onClick={() => handleRemove(item.id)}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="cart-summary">
                            <p>Subtotal ({cartItem.length} items): <span style={{ color: "green" }}>${total}</span></p>
                            <button>Proceed to Payment</button>
                        </div>
                    </Container>
            }
        </>
    )
}