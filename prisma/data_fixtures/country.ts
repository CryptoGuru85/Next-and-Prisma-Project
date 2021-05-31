async function main(prisma: any) {
  console.log('- Country Table')

  await prisma.country.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Armenia',
      code: 'AM',
      dial_code: '+374'
    }
  })

  await prisma.country.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Brazil',
      code: 'BR',
      dial_code: '+55'
    }
  })

  await prisma.country.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Canada',
      code: 'CA',
      dial_code: '+1'
    }
  })

  await prisma.country.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'China',
      code: 'CN',
      dial_code: '+86'
    }
  })

  await prisma.country.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      name: 'Czech Republic',
      code: 'CZ',
      dial_code: '+420'
    }
  })

  await prisma.country.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      name: 'Russia',
      code: 'RU',
      dial_code: '+7'
    }
  })

  await prisma.country.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      name: 'United States',
      code: 'US',
      dial_code: '+1'
    }
  })
}

export default main;
