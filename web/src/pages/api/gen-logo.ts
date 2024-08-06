import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    setTimeout(() => {
      const result = { image: 'https://via.placeholder.com/150' };
      res.status(200).json({ result });
    }, 2000);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
