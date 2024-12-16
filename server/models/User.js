import mongoose from "mongoose"


const authSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin']
        }

    }
    , {
        timestamps: true
    }
)


const AuthModel = mongoose.model('auth', authSchema)
export default AuthModel