import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET': // Regions List
        const regions = await prisma.region.findMany()
        res.json({
          items: regions, // TODO: какой ключ удобнее: 'data' or 'regions'?
          pagination: {} // TODO: paginated response
        })
        break

      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
