export interface UpdateUserAddressRequestBody {
    name: string
    phone: string
    address: string
    isDefault: boolean
}

export interface ChangePasswordRequestBody {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface UpdateRoleRequestBody {
    role: 'admin' | 'user'
}
