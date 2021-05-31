async function main(prisma: any) {
  console.log('- City Table')

  await prisma.city.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'New York',
      country: 1
    }
  })

  await prisma.city.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Chicago',
      country: 1
    }
  })

  await prisma.city.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Moscow',
      country: 6
    }
  })

  await prisma.city.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: 'Odesa',
      country: 6
    }
  })
}

export default main;
