const express = require('express');
const app = express();

//this is the http method to get the request
//the get method is sent to the URL "'/'"
// app.get('/', (req, res) => {
//this is the response that we are sending
//     res.status(200).send('hello from the server side');
// });
//OR
app.get('/', (req, res) => {
    //this is the response that we are sending
    res
        .status(200)
        //using this json method will automatically set our content type to application/json
        .json({ message: 'hello from the server side', app: 'Natours' });
});
app.post('/', (req, res) => {
    res.send('you can post to this end point');
});
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});