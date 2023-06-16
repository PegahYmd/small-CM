/*
 * [2022/2023]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 9
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { React, useState, useEffect } from 'react';
import { Container, Toast } from 'react-bootstrap/'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { FrontOfficeLayout, BackOfficeLayout, AdminLayout, AddLayout, EditLayout, DefaultLayout, NotFoundLayout, LoadingLayout } from './components/PageLayout';

import MessageContext from './messageCtx';
import API from './API';

function App() {

  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(true);

  // This state is used for displaying a LoadingLayout while we are waiting an answer from the server.
  const [loading, setLoading] = useState(false);

  // This state contains the list of films (it is initialized from a predefined array).
  const [pages, setPages] = useState([]);

  const [pagesFiltered, setpagesFiltered] = useState([]);

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

   /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An URL of the corresponding route (it MUST match /filter/<filter-key>)
   * - A filter function applied before passing the films to the FilmTable component
   */

  return (
    <BrowserRouter>
      <MessageContext.Provider value={{ handleErrors }}>
        <Container fluid className='App'>
          <Navigation/>
          <Routes>
            <Route path="/" element={ loading ? <LoadingLayout /> : <DefaultLayout pages={pages} pagesFiltered={pagesFiltered} /> } >
              <Route index element={ <FrontOfficeLayout Pages={pages} setPages={setPages} dirty={dirty} setDirty={setDirty} /> } />
              <Route path="page/:filterId" element={ <BackOfficeLayout Pages={pages} setPages={setPages} pagesFiltered={pagesFiltered} setpagesFiltered={setpagesFiltered} dirty={dirty} setDirty={setDirty} /> } />
              <Route path="admin" element={ <AdminLayout Pages={pages} setPages={setPages} pagesFiltered={pagesFiltered} setpagesFiltered={setpagesFiltered} dirty={dirty} setDirty={setDirty} /> } />
              <Route path="add" element={ <AddLayout /> } />
              <Route path="edit/:PageId" element={ <EditLayout Pages={pages}  setDirty={setDirty} /> } />
              <Route path="*" element={<NotFoundLayout />} />
            </Route>
          </Routes>
          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide>
            <Toast.Body>{ message }</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
  );

}

export default App;
