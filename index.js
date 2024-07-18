const express=require( 'express');
const dotenv=require( 'dotenv').config()  ;
const connectDB=require( './config/db.js');
const cookieParser=require( 'cookie-parser');
const bodyParser=require( 'body-parser');
const errorHandler=require( './middleware/errorMiddleware.js');
const  notFound =require( './middleware/notFound.js');
const asyncHandler=require('./middleware/asyncHandler.js')
const userRoutes=require('./routes/userRoutes.js');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(errorHandler);
app.use(notFound);
app.use(asyncHandler);

//start server
const port = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
