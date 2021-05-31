import * as yup from 'yup'
import moment from "moment";

const schema = yup.object().shape({
    bread: yup.number().required(),
    userId: yup.number().required(),
    eventId: yup.number().required(),
    path: yup.string().default('').notRequired(),
    text: yup.string().required(),
    dateCreate: yup.date().transform((value: any) => {
        value = moment(value);
        return value.isValid() ? new Date(value.format("YYYY-MM-DD HH:mm:ss")) : new Date('')
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
