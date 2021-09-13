const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['app.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/** 
 * @swagger
 * /books:
 *  get:
 *   description: Get All Books
 *   responses:
 *    200:
 *     description: success
 * 
 */
app.get('/books', (req, res)=>{
    res.send([
        {
            isbn : '9781781100486',
            title: 'Harry Potter and the Sorcerer\'s Stone', 
            author: 'J.K. Rowling', 
            publisher: 'Scholastics'
        }
    ]);
});


/**
 * @swagger
 * /book:
 *  post:
 *   description: get one book
 *   parameters: 
 *   - name: title
 *     description: Book Title
 *     in: body
 *     required: true
 *     type: string
 *   responses: 
 *        200:
 *         description: success
 *
 */
app.post('/book', (req, res)=>{
    const title=req.body.title;
    res.send({ title});
});

app.listen(3000, () => {
    console.log('running on port 3000');
})