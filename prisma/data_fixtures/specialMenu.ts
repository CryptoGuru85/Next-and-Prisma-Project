async function main(prisma: any) {
  console.log('- Создание специальное меню')

  await prisma.specialMenu.upsert({
    where: { id: 1 },
    update: { name: 'Vegetarian' },
    create: { id: 1, name: 'Vegetarian'},
  })
}

export default main;
