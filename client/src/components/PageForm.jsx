import dayjs from 'dayjs';

import {useState } from 'react';
import {Form, Button, Image, Row, Col  } from 'react-bootstrap';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'


const PageForm = (props) => {


  /*
   * Creating a state for each parameter of the page.
   * There are two possible cases: 
   * - if we are creating a new page, the page is initialized with the default values.
   * - if we are editing a page, the page is pre-filled with the previous values.
   */

  const [title, setTitle] = useState(props.page ? props.page.title : '');
  const [author, setAuthor] = useState(props.page ? props.page.author : '');

  // if exists page.watchDate is converted to string for the form control of type "date", otherwise it is set to empty string
  const [creation_date, setCreationDate] = useState((props.page && props.page.creation_date) ? props.page.creation_date.format('YYYY-MM-DD') : '');
  const [publication_date, setPublicationDate] = useState((props.page && props.page.publication_date) ? props.page.publication_date.format('YYYY-MM-DD') : '');

  const [paragraph, setParagraph] = useState(props.page ? props.page.paragraph : '');
  const [header, setHeader] = useState(props.page ? props.page.header : '');
  const [image, setImage] = useState(props.page ? props.page.image : 'Image not available');
  
  // useNavigate hook is necessary to change page
  const navigate = useNavigate();
  const location = useLocation();

  // if the page is saved (eventually modified) we return to the list of all films, 
  // otherwise, if cancel is pressed, we go back to the previous location (given by the location state)
  const nextpage = location.state?.nextpage || '/';

  const handleSubmit = (event) => {
    event.preventDefault();

    // String.trim() method is used for removing leading and ending whitespaces from the title.
    const page = {"title": title.trim(), "author": author.trim(), "creation_date": creation_date, "publication_date": publication_date, "paragraph":paragraph.trim(), "header":header.trim(), "image":image }
    
    /* In this solution validations are executed through HTML.
       If you prefer JavaScript validations, this is the right place for coding them. */

    if(props.page) {
      page.id = props.page.id;
      props.editPage(page);
    }
    else
      props.addPage(page);

    navigate('/');
  }

  // const handleClick = event => {
  //   // 👇️ refers to the image element
  //   console.log(event.target);

  //   console.log(`Image ${event.target.src} clicked`);
  // };

  return (
    <Form className="block-example border border-primary rounded mb-0 form-padding" onSubmit={handleSubmit}>



      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" required={true} value={title} onChange={event => setTitle(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" required={true} value={author} onChange={event => setAuthor(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Creation Date</Form.Label>
        { /* watchDate is an optional parameter. It have to be properly rendered only if available. */ }
        <Form.Control type="date" value={creation_date} onChange={event => setCreationDate(event.target.value) }/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publication Date</Form.Label>
        { /* watchDate is an optional parameter. It have to be properly rendered only if available. */ }
        <Form.Control type="date" value={publication_date} onChange={event => setPublicationDate(event.target.value) }/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Header</Form.Label>
        <Form.Control type="text" required={true} value={header} onChange={event => setHeader(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Paragraph</Form.Label>
        <Form.Control type="text" required={true} value={paragraph} onChange={event => setParagraph(event.target.value)}/>
        {/* <Button className="mb-3" variant="primary" type="submit"><i className="bi bi-plus"/></Button> */}
      </Form.Group>

      <Form.Group className="mb-3 images-div">
        <Form.Label>Image (choose one of these):</Form.Label>
        <Row>
        <Col xs={6} md={3}>
          <Image src='../src/images/1.jpg' thumbnail value={image} onClick={event => setImage(event.target.src)}/>
        </Col>
        <Col xs={6} md={3}>
          <Image src='../src/images/2.jpg' thumbnail value={image} onClick={event => setImage(event.target.src)}/>
        </Col>
        <Col xs={6} md={3}>
          <Image src='../src/images/3.jpg' thumbnail value={image} onClick={event => setImage(event.target.src)}/>
        </Col>
        <Col xs={6} md={3}>
          <Image src='../src/images/4.jpg' thumbnail value={image} onClick={event => setImage(event.target.src)}/>
        </Col>
      </Row>

        {/* <Form.Control type="text" required={true} value={paragraph} onChange={event => setParagraph(event.target.value)}/> */}
        
      </Form.Group>





      <Button className="mb-3" variant="primary" type="submit">Save</Button>
      &nbsp;
      <Link className="btn btn-danger mb-3" to={nextpage}> Cancel </Link>
    </Form>
  )

}

export default PageForm;
