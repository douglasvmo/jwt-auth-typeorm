import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import User from '../model/User'

class UsserController {
  async store(req: Request, res: Response) {
    const repository = getRepository(User)
    const { email, password } = req.body;

    const userExist = await repository.findOne({ where: { email } })

    if (userExist) {
      return res.sendStatus(409)
    }
    const user = repository.create({ email, password })
    await repository.save(user)
    return res.status(201).json(user)
  }

}
export default new UsserController();