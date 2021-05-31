async function main(prisma: any) {
  console.log('- Создание "review" для туров')

  await prisma.review.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      text: 'review 1',
      bread: 1,
      path: "",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 2},
    update: {},
    create: {
      id: 2,
      text: 'review 2',
      bread: 2,
      path: "1",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 3},
    update: {},
    create: {
      id: 3,
      text: 'review 3',
      bread: 3,
      path: "1.2",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 4},
    update: {},
    create: {
      id: 4,
      text: 'review 4',
      bread: 4,
      path: "1",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 5},
    update: {},
    create: {
      id: 5,
      text: 'review 5',
      bread: 5,
      path: "",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 6},
    update: {},
    create: {
      id: 6,
      text: 'review 6',
      bread: 6,
      path: "5",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 6},
    update: {},
    create: {
      id: 6,
      text: 'review 6',
      bread: 6,
      path: "5",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 7},
    update: {},
    create: {
      id: 7,
      text: 'review 7',
      bread: 7,
      path: "5.6",
      userId: 1,
      eventId: 1
    }
  });

  await prisma.review.upsert({
    where: { id: 8},
    update: {},
    create: {
      id: 8,
      text: 'review 8',
      bread: 8,
      path: "5.6.7",
      userId: 1,
      eventId: 1
    }
  });

}

export default main;
