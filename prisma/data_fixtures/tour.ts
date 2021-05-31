async function main(prisma: any) {
  console.log('- Создание 360° туров')

  await prisma.tour.upsert({
    where: { id: 1 },
    update: { name: 'Spectrum Designs' },
    create: { id: 1, name: 'Spectrum Designs', userId: 1},
  })

  await prisma.tour.upsert({
    where: { id: 2 },
    update: { name: 'Disney World' },
    create: { id: 2, name: 'Disney World', userId: 1,},
  })

  await prisma.tour.upsert({
    where: { id: 3 },
    update: { name: 'Plaza Hotel' },
    create: { id: 3, name: 'Plaza Hotel', userId: 1,},
  })
}

export default main;
