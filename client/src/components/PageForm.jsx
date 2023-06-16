import dayjs from 'dayjs';

import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const PageForm = (props) => {
  /*
   * Creating a state for each parameter of the film.
   * There are two possible cases: 
   * - if we are creating a new film, the form is initialized with the default values.
   * - if we are editing a film, the form is pre-filled with the previous values.
   */
  const [title, setTitle] = useState(props.page ? props.page.title : '');
  const [author, setAuthor] = useState(props.page ? props.page.author : '');
  // if exists film.watchDate is converted to string for the form control of type "date", otherwise it is set to empty string
  const [creation_date, setCreationDate] = useState((props.page && props.page.creation_date) ? props.page.creation_date.format('YYYY-MM-DD') : '');
  const [publication_date, setPublicationDate] = useState((props.page && props.page.publication_date) ? props.page.publication_date.format('YYYY-MM-DD') : '');

  const [paragraph, setParagraph] = useState(props.page ? props.page.paragraph : '');
  const [header, setHeader] = useState(props.page ? props.page.header : '');
  // useNavigate hook is necessary to change page
  const navigate = useNavigate();
  const location = useLocation();

  // if the film is saved (eventually modified) we return to the list of all films, 
  // otherwise, if cancel is pressed, we go back to the previous location (given by the location state)
  const nextpage = location.state?.nextpage || '/';

  const handleSubmit = (event) => {
    event.preventDefault();

    // String.trim() method is used for removing leading and ending whitespaces from the title.
    const page = {"title": title.trim(), "author": author.trim(), "creation_date": creation_date, "publication_date": publication_date, "paragraph":paragraph.trim(), "header":header.trim() }
    
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
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" required={true} value={image} onChange={event => setImage(event.target.value)}/>
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">Save</Button>
      &nbsp;
      <Link className="btn btn-danger mb-3" to={nextpage}> Cancel </Link>
    </Form>
  )

}

export default PageForm;
