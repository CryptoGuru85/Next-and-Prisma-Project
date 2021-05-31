async function main(prisma: any) {
  console.log('- Создание регионов')

  await prisma.region.upsert({
    where: { id: 1 },
    update: { name: 'Россия, Москва' },
    create: { id: 1, name: 'Россия, Москва'},
  })

  await prisma.region.upsert({
    where: { id: 2 },
    update: { name: 'Россия, Новосибирск' },
    create: { id: 2, name: 'Россия, Новосибирск'},
  })

  await prisma.region.upsert({
    where: { id: 3 },
    update: { name: 'Россия, Санкт-Петербург' },
    create: { id: 3, name: 'Россия, Санкт-Петербург'},
  })
}

export default main;
