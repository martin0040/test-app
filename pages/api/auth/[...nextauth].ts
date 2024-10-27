import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();

                const user = await User.findOne({ email: credentials?.email }) as { _id: Types.ObjectId, email: string, password: string } | null;
                if (!user) {
                    throw new Error('No user found with the given email');
                }
                if (!credentials?.password) {
                    throw new Error('Password is required');
                }
                const isValid = await bcrypt.compare(credentials?.password, user.password);
                if (!isValid) {
                    throw new Error('Invalid password');
                }

                return { id: user._id.toString(), email: user.email };
            }
        })
    ],
    pages: {
        signIn: '/', // Redirect to the home page for sign-in
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
});
