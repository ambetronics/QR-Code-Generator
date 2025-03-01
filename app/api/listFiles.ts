import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const publicDir = path.join(process.cwd(), 'public');
  fs.readdir(publicDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list files' });
    }
    res.status(200).json(files);
  });
} 