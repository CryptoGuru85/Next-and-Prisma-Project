async function main(prisma: any) {
  console.log('- Создание "ticket" для туров')

  await prisma.ticket.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      userId: 1,
      name: 'ticket 1',
      eventId: 1
    }
  })

  await prisma.ticket.upsert({
    where: { id: 2},
    update: {},
    create: {
      id: 2,
      userId: 1,
      name: 'ticket 2',
      eventId: 2,
    }
  })

  await prisma.ticketItems.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      name: 'ticket item 1',
      status: 0,
      options: {},
      qrCode: '',
      ticketId: 1,
      count: 100,
      userId: 1,
      price: {price: 1, currency: "USD"}
    }
  })

  await prisma.ticketItems.upsert({
    where: { id: 2},
    update: {},
    create: {
      id: 2,
      name: 'ticket item 2',
      status: 10,
      qrCode: '',
      ticketId: 1,
      count: 0,
      userId: 1,
      price: {price: 1, currency: "BTC"}
    }
  })

  await prisma.ticketItems.upsert({
    where: { id: 3},
    update: {},
    create: {
      id: 3,
      name: 'ticket item 3',
      options: {},
      ticketId: 1,
      count: 10,
      userId: 1,
      price: {price: 15, currency: "USD"}
    }
  })
}

export default main;
