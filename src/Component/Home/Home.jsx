import CardComp from '../Card/Card'
import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../Store/ProductSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from "react-spinners";

export default function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.product.allProducts)
    const [visible, setVisible] = useState(10);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            if (allProducts.length === 0) {
                try {
                    const response = await fetch(`https://dummyjson.com/products?limit=194&skip=0`);
                    const data = await response.json();
                    dispatch(setProducts(data.products));
                }
                catch (error) {
                    console.log("Not found data");
                }
                finally {
                    SetLoading(false);
                }
            }
            else {
                SetLoading(false);
            }
        }
        fetchApi();
    }, [dispatch, allProducts.length])

    const fetchMoreData = () => {
        setTimeout(() => {
            setVisible((prev) => prev + 10)
        }, 500)
    }

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <ClipLoader color='yellow' size={100} />
            </div>
        )
    }

    return (
        <>
            <Container style={{paddingTop: "10px"}}>
                <InfiniteScroll dataLength={visible} next={fetchMoreData} hasMore={visible < allProducts.length} loader={
                    <div className='d-flex justify-content-center align-items-center' style={{minHeight: "150px"}}>
                        <ClipLoader color='yellow' size={100} />
                    </div>
                }>
                    <Row>
                        {
                            allProducts.slice(0, visible).map((item, index) => (
                                <Col key={item.id} md='4' className='mb-4'>
                                    <CardComp product={item} />
                                </Col>
                            ))
                        }
                    </Row>
                </InfiniteScroll>
            </Container>

        </>
    )
}