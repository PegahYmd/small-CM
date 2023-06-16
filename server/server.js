/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const cors = require('cors');

const { check, validationResult, } = require('express-validator'); // validation middleware

const pageDao = require('./dao'); // module for accessing the pages table in the DB

/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));


/*** Utility Functions ***/

// This function is used to format express-validator errors as strings
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};


/*** pages APIs ***/

// 1. Retrieve the list of all the available pages.
// GET /api/pages
// This route returns the pageLibrary. It handles also "filter=?" query parameter
app.get('/api/pages',
  (req, res) => {
    // get pages that match optional filter in the query
    pageDao.listPages(req.query.filter)
      // NOTE: "invalid dates" (i.e., missing dates) are set to null during JSON serialization
      .then(pages => res.json(pages))
      .catch((err) => res.status(500).json(err)); // always return a json and an error message
  }
);

app.get('/api/pages/filter/:userId',
  [ check('userId').isInt({min: 1}) ],
  async (req, res) => {
    try {
      const result = await pageDao.getPageFilterUser(req.params.userId);
      if (result.error)
        res.status(404).json(result);
      else
        // NOTE: "invalid dates" (i.e., missing dates) are set to null during JSON serialization
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

// 2. Retrieve a page, given its “id”.
// GET /api/pages/<id>
// Given a page id, this route returns the associated page from the library.
app.get('/api/pages/:id',
  [ check('id').isInt({min: 1}) ],    // check: is the id a positive integer?
  async (req, res) => {
    try {
      const result = await pageDao.getPage(req.params.id);
      if (result.error)
        res.status(404).json(result);
      else
        // NOTE: "invalid dates" (i.e., missing dates) are set to null during JSON serialization
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);


// 3. Create a new page, by providing all relevant information.
// POST /api/pages
// This route adds a new page to page library.
app.post('/api/pages',
  [
    check('user').isInt(),
    check('title').isLength({min: 1, max:160}),
    check('author').isLength({min: 1, max:160}),
    // only date (first ten chars) and valid ISO
    // check('creation_date').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
    // check('publication_date').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
  ],
  async (req, res) => {
    // Is there any validation error?
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }

    // WARN: note that we expect watchDate with capital D but the databases does not care and uses lowercase letters, so it returns "watchdate"
    const page = {
      user: req.body.user,
      title: req.body.title,
      author: req.body.author,
      creation_date: req.body.creation_date, // A different method is required if also time is present. For instance: (req.body.watchDate || '').split('T')[0]
      publication_date: req.body.publication_date,
      blocks: req.body.blocks, // alternatively you can use the user id in the request, but it is not safe
      header: req.body.header,
      paragraph: req.body.paragraph,
    };

    try {
      const result = await pageDao.createPage(page); // NOTE: createpage returns the new created object
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new page: ${err}` }); 
    }
  }
);

// 4. Update an existing page, by providing all the relevant information
// PUT /api/pages/<id>
// This route allows to modify a page, specifiying its id and the necessary data.
app.put('/api/pages/:id',
  [
    check('id').isInt(),
    // check('user').isInt(),
    check('title').isLength({min: 1, max:160}),
    check('author').isLength({min: 1, max:160}),
    // only date (first ten chars) and valid ISO
    check('creation_date').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
    check('publication_date').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
    check('header').isLength({min: 1, max:500}),
    check('paragraph').isLength({min: 1, max:500})
  ],
  async (req, res) => {
    // Is there any validation error?
    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ")  }); // error message is a single string with all error joined together
    }
    // Is the id in the body equal to the id in the url?
    if (req.body.id !== Number(req.params.id)) {
      return res.status(422).json({ error: 'URL and body id mismatch' });
    }

    const page = {
      id: req.body.id,
      user: req.body.user,
      title: req.body.title,
      author: req.body.author,
      creation_date: req.body.creation_date, // A different method is required if also time is present. For instance: (req.body.watchDate || '').split('T')[0]
      publication_date: req.body.publication_date,
      blocks: req.body.blocks,
      header: req.body.header,
      paragraph: req.body.paragraph,
    };

    try {
      const result = await pageDao.updatePage(page.id, page);
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of page ${req.params.id}: ${err}` });
    }
  }
);


// 7. Delete an existing page, given its “id”
// DELETE /api/pages/<id>
// Given a page id, this route deletes the associated page from the library.
app.delete('/api/pages/:id',
  [ check('id').isInt() ],
  async (req, res) => {
    try {
      // NOTE: if there is no page with the specified id, the delete operation is considered successful.
      await pageDao.deletePage(req.params.id);
      res.status(200).json({}); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of page ${req.params.id}: ${err} ` });
    }
  }
);


// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
