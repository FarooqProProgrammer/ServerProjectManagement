import express from 'express';
import chalk from 'chalk';
import cors from "cors"
import connectDb from './config/db.js';
import AuthRoute from './routes/auth-route.js';
import ProjectRouter from './routes/project-route.js';

const app = express();
connectDb()
app.use(cors())
app.use(express.json())



/*
    API ROUTES START 
*/

app.use('/api/auth', AuthRoute);
app.use("/api",ProjectRouter)




app.listen(3001, () => {
    console.log(chalk.green.bold('Server is running on port http://localhost:') + chalk.cyan('3001 ') + chalk.green.bold('successfully!'));
});
