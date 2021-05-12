import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listBlogDetails, updateBlog } from '../actions/blogActions'
import { BLOG_UPDATE_RESET } from '../constants/blogConstants'

const BlogEditScreen = ({ match, history }) => {

  const blogId = match.params.id;


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Sports')
  const [content, setContent] = useState('')
  const [uploading, setUploading] = useState(false)
  

  const dispatch = useDispatch()

  const blogDetails = useSelector((state) => state.blogDetails)
  const { loading, error, blog } = blogDetails

  const blogUpdate = useSelector((state) => state.blogUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = blogUpdate

  const userList = useSelector((state) => state.userList)
  const { users } = userList


  useEffect(() => {

    if(successUpdate) {
        dispatch({ type: BLOG_UPDATE_RESET })
        history.push('/admin/bloglist')
    } else {
        if (!blog.title || blog._id !== blogId) {
            dispatch(listBlogDetails(blogId))
          } else {
            setTitle(blog.title)
            setImage(blog.image)
            setCategory(blog.category)
            setContent(blog.content)
          }
    }
    
  }, [blog, blogId, dispatch, history, successUpdate])



  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    // console.log(file);
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploadBlog', formData, config)
      console.log(data);  

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  


  const submitHandler = (e) => {
    e.preventDefault()
    console.log(image);
    dispatch(updateBlog({ _id: blogId, title, author, image, category, content }))
  }

  return (

    <>
        <Link to='/admin/bloglist' className='btn btn-light my-3'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1> 
            { loadingUpdate && <Loader /> }
            { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Author Name'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    type='file'
                    name='image'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>


                <Form.Group controlId='content'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea" rows={15}
                    placeholder='Enter Description'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></Form.Control>
                </Form.Group>

                

                
                    <Button type='submit' variant='primary'>
                    Update
                    </Button>
                </Form>
            ) }
        
        </FormContainer>
    </>
    
  )
}

export default BlogEditScreen