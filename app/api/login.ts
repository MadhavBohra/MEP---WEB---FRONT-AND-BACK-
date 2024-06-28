import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import pool from '../utils/postgres';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    const query = `
      SELECT * FROM credentials
      WHERE username = $1 OR email = $1
    `;

    const result = await client.query(query, [username]);

    client.release();

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
