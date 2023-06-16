import 'dayjs';

import { Table, Form, Button } from 'react-bootstrap/'
import { Link, useLocation } from 'react-router-dom';

function PageTable(props) {
  
  const filteredPages = props.Pages;

  return (
    <Table striped>
      <tbody>
        { 
          filteredPages.map((page) =>
            <PageRow key={page.id} pageData={page} deletePage={props.deletePage} updatePage={props.updatePage} editable={props.editable} />
          )
        }
      </tbody>
    </Table>
  );
}
  
function PageRow(props) {

  const formatDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }

  // location is used to pass state to the edit (or add) view so that we may be able to come back to the last filter view
  const location = useLocation();


  if(props.editable){
    return(
      <tr>
        <td>
          <Link className="btn btn-primary" to={"/edit/" + props.pageData.id} state={{nextpage: location.pathname}}>
            <i className="bi bi-pencil-square"/>
          </Link>
          &nbsp;
          <Button variant='danger' onClick={() => props.deletePage(props.pageData.id)}>
            <i className="bi bi-trash"/>
          </Button>
        </td>
        <td>
          <p>
            {props.pageData.title}
          </p>
        </td>
        <td>
          <p>
            {props.pageData.author}
          </p>
        </td>
        <td>
          <small>{formatDate(props.pageData.creation_date, 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <small>{formatDate(props.pageData.publication_date, 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <p>
            {props.pageData.header}
          </p>
        </td>
        <td>
          <p>
            {props.pageData.paragraph}
          </p>
        </td>
      </tr>
    );
  }
  else{
    return(
      <tr>
        <td>
        </td>
        <td>
          <p>
            {props.pageData.title}
          </p>
        </td>
        <td>
          <p>
            {props.pageData.author}
          </p>
        </td>
        <td>
          <small>{formatDate(props.pageData.creation_date, 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <small>{formatDate(props.pageData.publication_date, 'MMMM D, YYYY')}</small>
        </td>
        <td>
          <p>
            {props.pageData.header}
          </p>
        </td>
        <td>
          <p>
            {props.pageData.paragraph}
          </p>
        </td>
      </tr>
    );
  }
  
}

export default PageTable;
