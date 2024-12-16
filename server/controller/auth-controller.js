import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import AuthModel from '../models/User.js';
import dotenv from "dotenv"

dotenv.config()

class AuthController {
    static async AuthRegister(req, res) {
        try {
            // Extracting user input from request body
            const { name, email, password, role } = req.body;

            // 1. Input validation (basic checks)
            if (!name || !email || !password || !role) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                    error: 'All fields are required (name, email, password, role).'
                });
            }

            // 2. Check if user already exists in the database by email
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(StatusCodes.CONFLICT).json({
                    message: ReasonPhrases.CONFLICT,
                    error: 'Email is already in use.'
                });
            }

            // 3. Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 12); // 12 is the salt rounds

            // 4. Create a new user instance
            const newUser = new AuthModel({
                name,
                email,
                password: hashedPassword,
                role
            });

            // 5. Save the user to the database
            const savedUser = await newUser.save();

            // 6. Respond with success
            return res.status(StatusCodes.CREATED).json({
                message: ReasonPhrases.CREATED,
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role,
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while registering the user.'
            });
        }
    }

    // Login Endpoint
    static async AuthLogin(req, res) {
        try {
            // Extracting email and password from request body
            const { email, password } = req.body;

            // 1. Input validation (basic check)
            if (!email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                    error: 'Email and password are required.'
                });
            }

            // 2. Find user by email
            const user = await AuthModel.findOne({ email });
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                    error: 'User not found.'
                });
            }

            // 3. Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: ReasonPhrases.UNAUTHORIZED,
                    error: 'Invalid email or password.'
                });
            }

            // 4. Create JWT token (with a 1-hour expiration in this example)
            const token = jwt.sign(
                { userId: user._id, role: user.role },  // Payload
                process.env.JWT_SECRET_KEY,  // Secret key (should be stored in environment variables)
                { expiresIn: '1h' } // Expiry time
            );

            // 5. Respond with success and the token
            return res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while logging in the user.'
            });
        }
    }
}

export default AuthController;
