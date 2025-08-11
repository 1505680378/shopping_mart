import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import CustomerReviews from "../CustomerReview/CustomerReviews";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.log("Error : " + err)
            }
        }

        fetchAPI();
    }, [id])

    if (!product) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <ClipLoader color='yellow' size={100} />
            </div>
        )
    }
    return (
        <>
            <Container className="carousel-container">
                <Row>
                    {/* For Product Images */}
                    <Col lg="6" className="m-4 rounded-3" >
                        <Carousel>
                            {
                                product.images.map((img, index) => (
                                    <Carousel.Item key={index}>
                                        <img src={img}  alt={`Slide ${index}`} className="carousel-image rounded-3 p-3"/>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </Col>

                    {/* For Product Info. */}
                    <Col lg='5   ' className="my-4 p-0">
                            <h1 className="fw-bold" style={{color: "#212529"}}>{product.title}</h1>
                            <p className="fw-semibold">{product.brand}</p>
                            <span className="product-status">{product.availabilityStatus}</span> <span className="product-category">{product.category}</span>
                            <p className="fw-semibold mt-4">{product.description}</p>

                            <span className="fw-bolder fs-4"

                                 style={{color : "#1371fc"}}>${product.price}</span>

                                 <span style={{textDecoration: "line-through", fontSize: "20px", fontWeight: "bold", color: "#4f4f4fff", margin: "0px 10px"}}> ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>

                                  <span style={{backgroundColor: '#dc3545', padding: '2px 8px', fontWeight: "500", color: "white", borderRadius: '4px', marginLeft: "5px"}}>{product.discountPercentage}% OFF

                            </span>

                            <div className="product-information">
                                <p><span className="fw-semibold">Rating: </span> <span><i className="fa-solid fa-star product-rating"></i>{product.rating}</span></p>

                                <p><span className="fw-semibold">Stock: </span> <span>{product.stock} items</span></p>

                                <p><span className="fw-semibold">Dinemsions: </span> <span>{product.dimensions.width}W * {product.dimensions.height}H * {product.dimensions.depth}D </span></p>

                                <p><span className="fw-semibold">Weight: </span> <span>{product.weight} kg</span></p>

                                <p><span className="fw-semibold">Shipping: </span> <span>{product.shippingInformation}</span></p>

                                <p><span className="fw-semibold">Warranty: </span> <span>{product.warrantyInformation}</span></p>

                                <p><span className="fw-semibold">Return Policy: </span> <span>{product.returnPolicy}</span></p>

                                <p><span className="fw-semibold">SKU: </span> <span>{product.sku}</span></p>

                                <p><span className="fw-semibold">Tags: </span> <span style={{padding: "2px 10px", backgroundColor: "#6c757d", color : "white", borderRadius: "4px", fontWeight: "500"}}>{product.tags[0]}</span> <span style={{padding: "2px 10px", backgroundColor: "#6c757d", color : "white", borderRadius: "4px", fontWeight: "500"}}>{product.tags[1]}</span></p>
                            </div>
                    </Col>
                </Row>

                <CustomerReviews item={product}/>
            </Container>
        </>
    )
}