import * as yup from 'yup'

const schema = yup.object().shape({
  kitchens: yup.array().of(yup.string()).default([]).nullable().notRequired(),
  specialMenu: yup.array().of(yup.string()).default([]).nullable().notRequired(),
  facilities: yup.array().of(yup.string()).default([]).nullable().notRequired(),
  menu: yup.array().of(yup.string()).default([]).nullable().notRequired(),
  fullMenu: yup.array().of(yup.string()).default([]).nullable().notRequired(),
  averagePrice: yup.number().required().transform(value => {
    return Number(value) || null
  }),
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
