import React from 'react'
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'


const Blog = ({blog}) => {
    return (
        <>
            <CardDeck className='mt-5'>
            <Card>
                <Card.Img variant="top" src={blog.image} />
                <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                    {blog.content.substring(0, 100)}
                </Card.Text>
                <LinkContainer to={`/blogs/${blog._id}`}> 
                        <Button className='btn-sm' variant='success'>
                            Read More...
                        </Button>
                </LinkContainer>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">{blog.createdAt.substring(0, 10)}</small>
                </Card.Footer>
            </Card>
            </CardDeck>
        </>
    )
}

export default Blog

