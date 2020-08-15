import { Request, Response, json, response } from 'express'
import { getRepository } from 'typeorm'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


import User from '../model/User'

class AuthController {
  async store(req: Request, res: Response) {

    const repository = getRepository(User)
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      return res.sendStatus(401)
    }

    const isValidPassword = await bcryptjs.compare(password, user.password)

    if (!isValidPassword) {
      return res.sendStatus(401)
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' })

    delete user.password

    return res.json({ user, token })

  }
}

export default new AuthController();