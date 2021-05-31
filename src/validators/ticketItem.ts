import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required(),
    userId: yup.number().required(),
    ticketId: yup.number().required(),
    status: yup.number().required(),
    options: yup.object().default({}).notRequired(),
    qrCode: yup.string().default('').notRequired(),
    count: yup.number().required(),
    price: yup.object().shape({
        price: yup.number().required(),
        currency: yup.string().required(),
    })
})

const validate = async (data: object) => {
    let errors = []
    try {
        await schema.validate(data)
    } catch (e) {
        errors = e.errors
    }

    if (errors.length) {
        throw new Error(errors.join(";\n"))
    }
    return errors
}

export {
    schema,
    validate
}
