async function main(prisma: any) {
  console.log('- Club Table')

  await prisma.club.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Night Club Primade sky'
    }
  })

  await prisma.club.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Club Primade'
    }
  })

  await prisma.club.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Night Club Sky'
    }
  })
}

export default main;
