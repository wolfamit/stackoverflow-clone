import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        name: {
                type: String,
                required: true,
                min: 2,
                max: 50,
        },
        email: {
                type: String, required: true, max: 50,
                unique: true,
        },
        password: {
                type: String, required: true, min: 5,
        },
        picturePath: {
                type: String,
                default: 'defaultpicture.jpg'

        },
        phoneNumber: {
                type: Number
        },
        friends: {
                type: Array,
                default: [],
        },
        about: {
                type: String, default: "",
        },
        tags: {
                type: [String], default: [],
        },
        subscription: [{
                plan: {
                        type: String,
                        default: 'Free',
                        required: true
                },
                startDate: {
                        type: Date,
                },
                endDate: {
                        type: Date,
                }
        }],

        location: String,
        occupation: String,
        viewedProfile: {
                type: Number,
                default: () => Math.floor(Math.random() * 100)
        },
        impressions: {
                type: Number,
                default: () => Math.floor(Math.random() * 100)
        },
        joinedOn: {
                type: Date, default: () => new Date(),
        },
        lastPostDate: {
                type: Date, default: () => new Date(0)
        },// Initialize with epoch (0)
        postCount: {
                type: Number, default: 0 // Track the number of posts made by the user
        }, 
        stripeCustomerId: {
                type: String,
                required: true
        }
})

export default mongoose.model("User", userSchema)

