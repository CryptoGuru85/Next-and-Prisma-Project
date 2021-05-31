async function main(prisma: any) {
  console.log('- Создание кухни')

  await prisma.kitchen.upsert({
    where: { id: 1 },
    update: { name: "European" },
    create: { id: 1, name: "European"},
  })

  await prisma.kitchen.upsert({
    where: { id: 2 },
    update: { name: "Russian" },
    create: { id: 2, name: "Russian"},
  })

  await prisma.kitchen.upsert({
    where: { id: 3 },
    update: { name: "Chinese" },
    create: { id: 3, name: "Chinese"},
  })
}

export default main;
