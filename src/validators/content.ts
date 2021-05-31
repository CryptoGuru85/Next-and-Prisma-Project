import * as yup from 'yup'

const schema = yup.object().shape({
  userId: yup.number().required().transform(value => {
    return Number(value)
  }),
  videoOverviewLink: yup.string().url().default('').nullable().notRequired(),
  tourLink: yup.string().url().default('').nullable().notRequired(),
  about: yup.string().default('').nullable().notRequired(),
  logo: yup.string().default('').nullable().notRequired(),
  eventPictures: yup.array().of(yup.string()).default('').nullable().notRequired(),
  videoOverview: yup.array().of(yup.string()).default('').nullable().notRequired()
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
