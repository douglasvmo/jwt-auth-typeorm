import { Request, Response } from 'express'

class UsserController {
    store(req: Request, res: Response) {
        res.send("ok")

    }

}
export default new UsserController();