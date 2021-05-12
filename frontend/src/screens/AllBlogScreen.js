import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta';
import { listBlogs } from '../actions/blogActions'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'



const AllBlogScreen = ({ history }) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const blogList = useSelector((state) => state.blogList)
    const { loading, error, blogs } = blogList;


    useEffect(() => {
  
          if(!userInfo || !userInfo.isAdmin) {
              history.push('/login')
          } else {
            dispatch(listBlogs())
          }
      }, [dispatch, history, userInfo])


    return (
        <>

            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                <>
                    { blogs.map((blog) => (
                    <Card className='mt-5'>
                    <Card.Header style={{ 'color': 'red', 'backgroundColor': 'beige', 'fontWeight': 'bolder' }}>{blog.category}</Card.Header>
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>
                        {blog.content.substring(0, 150)}
                      </Card.Text>
                      <LinkContainer to={`/blogs/${blog._id}/`}> 
                        <Button className='btn-sm' variant='success'>
                            Read More
                        </Button>
                      </LinkContainer>
                    </Card.Body>
                  </Card>
                    ) ) }
                </>
            }
            
        </>
    )
}

export default AllBlogScreen
