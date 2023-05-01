import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = process.env.SECRET_KEY

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }

  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'Please provide an email and a password' })
    return
  }

  const saltRounds = 10
  if (!process.env.USER_PASSWORD) {
    console.error('Failed to parse .env file')
    return ;
  }
  bcrypt.hash(
    process.env.USER_PASSWORD,
    saltRounds,
    async function (err: Error | null, hash: string) {
      if (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
        return
      }

      // In a real-world scenario, fetch the user data from a database instead of hardcoding it
      const user = { email: process.env.USER_EMAIL, password: hash } // password is "password" hashed with bcrypt

      try {
        // Verify email and password
        const match = await bcrypt.compare(password, user.password)
        // const match = password === user.password
        if (!match || email !== user.email) {
          res.status(401).json({ message: 'Invalid credentials' })
          return
        }

        // Create and sign the token
        if (!SECRET_KEY) {
          console.error('SECRET_KEY is not defined')
          res.status(500).json({ message: 'Server Error' })
          return ;
        }
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ token })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
      }
    }
  )
}
