import {z} from 'zod'


export const validatorPassword = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
)

export const userSchemaZod = z.object({
    username: z.string().min(3,{ message: "La contraseña debe tener al menos 3 caracteres"}).max(10),
    password: z.string().min(6).max(10).regex(validatorPassword,{
        message: "La contraseña deber contener un caracter especial"
    })
})