import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/postgres';
import { getSession } from 'next-auth/react';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const email = req.query.email as string;

  try {
    const client = await pool.connect();
    const getUserQuery = `
      SELECT username, address, blood_group, height, weight, phone, profile_picture
      FROM consumer
      WHERE email = $1
    `;
    const result = await client.query(getUserQuery, [email]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { GET };
