import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItem, removeCartItem } from '../../Store/ProductSlice';

function CardComp({ product }) {

    const dispatch = useDispatch();
    const cartItem = useSelector((state)=> state.product.cartItem);

    const inCart = cartItem.some((item) => item.id === product.id);

    const handlePropagation= (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleAdd = (e) => {
        handlePropagation(e);
        dispatch(setCartItem(product));
    }

    const handleRemove = (e) => {
        handlePropagation(e);
        dispatch(removeCartItem(product.id))
    }
    return (
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
            <Card style={{ width: '20rem' }}>
                <img src={product.thumbnail} alt={product.title} loading="lazy" className="card-img-top product-thumbnail" />

                <Card.Body>
                    <Card.Title className='product-title fw-bold'>
                        {product.title} | {product.description}
                    </Card.Title>
                    <div>
                        <div>
                            <span className='product-rating'> <i className="fa-solid fa-star"></i> {product.rating}</span> <br />
                            <span className='fw-bold me-2'>${product.price}</span>
                            <span style={{textDecoration: "line-through", fontWeight: "bold", color: "#4f4f4fff", marginRight: "5px"}}> ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className='product-discount'>({product.discountPercentage}%)</span>
                            <br />
                            <span>Free {product.shippingInformation}</span>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' onClick={handlePropagation}>
                            {!inCart ? (
                                <button onClick={handleAdd} className='add-cart-button'>Add to cart</button>    )
                            :
                                (<button onClick={handleRemove} className='remove-cart-button'>Remove from Cart</button>)
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default CardComp;