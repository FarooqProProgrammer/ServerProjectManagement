import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from "dotenv"

dotenv.config()

const connectDb = async () => {
    try {
        const connectString = await mongoose.connect(process.env.DATABASE_URL);
        console.log(chalk.green.bold('Database connected successfully!') + chalk.cyan(` ${connectString.connection.host}`));
        return connectString;
    } catch (error) {
        console.error(chalk.red.bold('Error connecting to the database: ') + chalk.yellow(error.message));
        process.exit(1); 
    }
};

export default connectDb;
