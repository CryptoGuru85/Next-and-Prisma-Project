import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().default('').nullable().notRequired(),
    items: yup.array().of(yup.object()).nullable().notRequired()
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
