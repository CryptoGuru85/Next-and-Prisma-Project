async function main(prisma: any) {
  console.log('- Создание удобства')

  await prisma.facility.upsert({
    where: { id: 1 },
    update: { name: 'Smooking room' },
    create: { id: 1, name: 'Smooking room'},
  })

  await prisma.facility.upsert({
    where: { id: 2 },
    update: { name: 'Terrace' },
    create: { id: 2, name: 'Terrace'},
  })

  await prisma.facility.upsert({
    where: { id: 3 },
    update: { name: 'Open space' },
    create: { id: 3, name: 'Open space'},
  })
}

export default main;
