async function main(prisma: any) {
  console.log('- Создание "object plan" для туров')

  await prisma.plan.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      name: 'plan 1',
      userId: 1,
      eventId: 1
    }
  })

  await prisma.plan.upsert({
    where: { id: 2},
    update: {},
    create: {
      id: 2,
      name: 'plan 2',
      userId: 1,
      eventId: 2,
    }
  })

  await prisma.planItems.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      name: 'plan item 1',
      status: 0,
      options: {},
      qrCode: '',
      planId: 1,
      userId: 1,
      price: {price: 1, currency: "USD"}
    }
  })

  await prisma.planItems.upsert({
    where: { id: 2},
    update: {},
    create: {
      id: 2,
      name: 'plan item 2',
      status: 10,
      qrCode: '',
      planId: 1,
      userId: 1,
      price: {price: 1, currency: "BTC"}
    }
  })

  await prisma.planItems.upsert({
    where: { id: 3},
    update: {},
    create: {
      id: 3,
      name: 'plan item 3',
      options: {},
      planId: 1,
      userId: 1,
      price: {price: 15, currency: "USD"}
    }
  })
}

export default main;
