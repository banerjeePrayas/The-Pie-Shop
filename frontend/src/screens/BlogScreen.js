import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listBlogDetails } from '../actions/blogActions.js'


const BlogScreen = ({match}) => {


    const dispatch = useDispatch();

    const blogDetails = useSelector((state) => state.blogDetails);
    const { loading: blogLoading, error: blogError, blog } = blogDetails;

    useEffect(() => {
        dispatch(listBlogDetails(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <>
            <Meta title={blog.title}  /> 

            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
            <h1>{blog.title}</h1>
            <small style={{ 'color':'red', 'fontWeight': 'bold' }}>{blog.category}</small>
            <p></p>
            <small style={{ 'color':'green', 'fontWeight': 'bold' }}><i className="fas fa-user"></i> {blog.author}</small>
            <p></p>
            <Image src={blog.image} style={{'width': '846px', 'height': '350px'}} fluid />
            <p></p>
            <p>{blog.content}</p>
        </>
    )
}

export default BlogScreen
