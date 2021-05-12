import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
                <Card.Img class="card-img-top img-fluid" src={product.image} variant='top' />

            <Card.Body>
                    <Card.Title as='div'><strong>{ product.name }</strong></Card.Title>

                <Card.Text as='div'>
                    <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
                <LinkContainer to={`/product/${product._id}`}> 
                        <Button className='btn-sm' variant='success'>
                            Buy Now
                        </Button>
                </LinkContainer>
            </Card.Body>
        </Card>


    )
}

export default Product
