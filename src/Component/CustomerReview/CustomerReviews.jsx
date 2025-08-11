import { Container } from "react-bootstrap"

export default function CustomerReviews({item}){
    return (
        <>
            <Container style={{margin: "0px", maxWidth: "100%"}}>
                <h1>🗣️ Customer Reviews</h1>
                {
                    item.reviews && item.reviews.map((x, index) => (
                        <div key={index}  className="customer-reviews-div">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                 <p className="fw-semibold"><i className="fa-solid fa-star product-rating"></i> {x.rating}-{x.reviewerName}</p>

                                 <p>{x.comment}</p>
                            </div>
                            <div>
                                <p>{x.date} | {x.reviewerEmail}</p>
                            </div>
                        </div>
                    ))
                }
            </Container>
        </>
    )
}