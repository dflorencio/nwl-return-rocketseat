import express from 'express';


const app = express();

app.post('feedbacks', (req,res) =>{
    return res.send('hello world')
})

app.get('')
app.listen(3333, () => {
    console.log('HTTP server running')
});
