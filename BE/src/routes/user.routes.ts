import { Router } from 'express'
import {
    changePasswordController,
    getUserByIdController,
    updateUserAddressController,
    deleteUserController,
    getAllUsersController,
    updateRoleController
} from '~/controllers/user.controller'
import { accessTokenValidator, authorizeadmin } from '~/middlewares/auth.middlewares'
import { changePasswordValidator, updAddressValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const userRouter = Router()

/**
 * Description: Get all users (admin)
 * Path: /all-users
 * Method: GET
 * Query: { page: number, pageSize: number }
 */
userRouter.get('/all-users', accessTokenValidator, authorizeadmin, wrapRequestHandler(getAllUsersController))

/**
 * Description: Get profile
 * Path: /:user_id
 * Method: GET
 */
userRouter.get('/me', accessTokenValidator, wrapRequestHandler(getUserByIdController))

/**
 * Description: Update role (admin)
 * Path: /update-role/:user_id
 * Method: PUT
 * Body: { role: string }
 */
userRouter.put('/update-role/:user_id', accessTokenValidator, authorizeadmin, wrapRequestHandler(updateRoleController))

/**
 * Description: Update address
 * Path: /update-address/:user_id
 * Method: PUT
 * Body: { address: { name: string, phone: string, address: string, isDefault: boolean } }
 */
userRouter.put(
    '/update-address',
    accessTokenValidator,
    updAddressValidator,
    wrapRequestHandler(updateUserAddressController)
)

/**
 * Description: Change password
 * Path: /change-password/:user_id
 * Method: PUT
 * Body: { oldPassword: string, newPassword: string, confirmPassword: string }
 */
userRouter.put(
    '/change-password/:user_id',
    accessTokenValidator,
    changePasswordValidator,
    wrapRequestHandler(changePasswordController)
)

/**
 * Description: Delete user (admin)
 * Path: /delete-user/:user_id
 * Method: DELETE
 */
userRouter.delete(
    '/delete-user/:user_id',
    accessTokenValidator,
    authorizeadmin,
    wrapRequestHandler(deleteUserController)
)

export default userRouter
