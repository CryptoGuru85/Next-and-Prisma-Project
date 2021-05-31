import { PrismaClient } from '@prisma/client';
import region from './data_fixtures/region';
import kitchen from './data_fixtures/kitchen';
import specialMenu from './data_fixtures/specialMenu';
import facility from './data_fixtures/facility';
import tour from './data_fixtures/tour';
import event from './data_fixtures/event';
import plan from './data_fixtures/plan';
import ticket from './data_fixtures/ticket';
import review from './data_fixtures/review';
import country from './data_fixtures/country';
import city from './data_fixtures/city';
import club from './data_fixtures/club';

const prisma = new PrismaClient();

async function main() {
  await region(prisma);
  await kitchen(prisma);
  await specialMenu(prisma);
  await facility(prisma);
  await tour(prisma);
  await event(prisma);
  await plan(prisma);
  await ticket(prisma);
  await review(prisma);
  await country(prisma);
  await city(prisma);
  await club(prisma);

  console.log('DONE');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
