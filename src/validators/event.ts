import moment from 'moment'
import * as yup from 'yup'

const schema = yup.object().shape({
  author: yup.string().default('').nullable(),
  eventName: yup.string(),
  address: yup.string().default('').nullable().notRequired(),
  club: yup.string().default('').nullable().notRequired(),
  // addressLink,
  facebookLink: yup.string().default('').nullable().notRequired(),
  instagramLink: yup.string().default('').nullable().notRequired(),
  twitterLink: yup.string().default('').nullable().notRequired(),
  linkedinLink: yup.string().default('').nullable().notRequired(),
  pinterestLink: yup.string().default('').nullable().notRequired(),
  vkontakteLink: yup.string().default('').nullable().notRequired(),
  mapLink: yup.string().default('').nullable().notRequired(),
  phone: yup.string().default('').nullable().notRequired(),
  regionId: yup.number().nullable().notRequired().transform(value => {
    return Number(value) || null
  }),
  userId: yup.number().transform(value => {
    return Number(value)
  }),
  siteName: yup.string().default('').nullable().notRequired(),
  // placeId,
  // placeName,
  workingTimeFrom: yup.date().transform((value: any, originalValue: any) => {
    value = moment(value);
    return value.isValid() ? new Date(value.format("YYYY-MM-DD HH:mm:ss")) : new Date('')
  }),
  workingTimeTo: yup.date().transform((value: any, originalValue: any) => {
    value = moment(value);
    return value.isValid() ? new Date(value.format("YYYY-MM-DD HH:mm:ss")) : new Date('')
  }),
  image: yup.string().nullable().notRequired(),
  ticketprice: yup.number().nullable().notRequired(),
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
