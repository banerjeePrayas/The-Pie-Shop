import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta';
import { listBlogs, createBlog, deleteBlog } from '../actions/blogActions'
import { BLOG_CREATE_RESET } from '../constants/blogConstants'

const BlogListScreen = ({ history }) => {

    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList)
    const { loading, error, blogs } = blogList;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const blogCreate = useSelector((state) => state.blogCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, blog: createdBlog } = blogCreate;

    const blogDelete = useSelector((state) => state.blogDelete)
    const { loading: loadingDelete, error: errorDelete, success: sucessDelete } = blogDelete;

    useEffect(() => {

      dispatch({ type: BLOG_CREATE_RESET });

        if(!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } 
        
        if(successCreate) {
            history.push(`/admin/blogs/${createdBlog._id}/edit`)
        } else {
            dispatch(listBlogs())
        }

    }, [createdBlog, dispatch, history, successCreate, userInfo, sucessDelete])

    const createBlogHandler = () => {
      dispatch(createBlog())
    }

    const deleteHandler = (id) => {
      if(window.confirm('Are You Sure?')) {
        dispatch(deleteBlog(id));
      }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Blogs</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' variant='success' onClick={createBlogHandler}>
                        <i className='fas fa-plus'></i> Write Blog
                    </Button>
                </Col>
            </Row>

            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant='Danger'>{errorDelete}</Message> }

            { loadingCreate && <Loader /> }
            { errorCreate && <Message variant='Danger'>{errorCreate}</Message> }

            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
              <>
                <Meta title='Blogs | Admin Section' />
                <Table striped bordered hover responsive variant='dark' className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>Date</th>
                    <th>Author</th>
                  </tr>
                </thead>
                
                <tbody>
                { blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <Link style={{"color": 'white'}} to={`/blogs/${blog._id}`}>{blog._id}</Link>
                    </td>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.createdAt.substring(0, 10)}</td>
                    <td>{blog.author}</td>
                    
                    <td>
                      <LinkContainer to={`/admin/blogs/${blog._id}/edit`}> 
                        <Button className='btn-sm' variant='light'>
                            <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button className='btn-sm' variant='danger' onClick={() => deleteHandler(blog._id)}>
                            <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                  </tr>
                )) }
              </tbody>
              </Table>
              </>
            }
        </>
    )
}

export default BlogListScreen
