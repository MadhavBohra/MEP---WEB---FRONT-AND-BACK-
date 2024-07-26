import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/postgres';
import multer from 'multer';
import { getSession } from 'next-auth/react';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const email = session.user.email;

  upload.single('profilePicture')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const profilePicture = req.file.filename;

    try {
      const client = await pool.connect();
      const updateProfilePicQuery = `
        UPDATE consumer
        SET profile_picture = $1
        WHERE email = $2
      `;
      await client.query(updateProfilePicQuery, [profilePicture, email]);
      client.release();

      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

export default handler;

// Updated configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
