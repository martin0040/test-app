import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: any, res: any) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    try {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ message: 'User already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({ username, email, password: hashedPassword }).save();
      console.log(user, username);

      return res.status(201).json({ status: 201, message: 'User created!' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
