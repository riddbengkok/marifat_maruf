import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data for idempotency
  await prisma.order.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      status: 'active',
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      status: 'inactive',
    },
  });

  // Create subscriptions for users
  const aliceSub = await prisma.subscription.create({
    data: {
      userId: alice.id,
      plan: 'pro',
      status: 'active',
      startedAt: new Date('2024-07-01T00:00:00Z'),
      endsAt: new Date('2024-08-01T00:00:00Z'),
      paymentProvider: 'midtrans',
      paymentRef: 'MID-123456',
    },
  });
  const bobSub = await prisma.subscription.create({
    data: {
      userId: bob.id,
      plan: 'free',
      status: 'cancelled',
      startedAt: new Date('2024-06-01T00:00:00Z'),
      endsAt: new Date('2024-07-01T00:00:00Z'),
      cancelledAt: new Date('2024-07-01T00:00:00Z'),
      cancelReason: 'User requested cancellation',
      paymentProvider: null,
      paymentRef: null,
    },
  });

  // Create orders for Alice
  const aliceOrder1 = await prisma.order.create({
    data: {
      status: 'pending',
      statusPayment: 'unpaid',
      price: '100',
      published: true,
      userId: alice.id,
    },
  });
  const aliceOrder2 = await prisma.order.create({
    data: {
      status: 'completed',
      statusPayment: 'paid',
      price: '150',
      published: true,
      userId: alice.id,
    },
  });

  // Create orders for Bob
  const bobOrder1 = await prisma.order.create({
    data: {
      status: 'pending',
      statusPayment: 'unpaid',
      price: '200',
      published: false,
      userId: bob.id,
    },
  });
  const bobOrder2 = await prisma.order.create({
    data: {
      status: 'completed',
      statusPayment: 'paid',
      price: '250',
      published: true,
      userId: bob.id,
    },
  });

  // Create an order with no user
  const orphanOrder = await prisma.order.create({
    data: {
      status: 'pending',
      statusPayment: 'unpaid',
      price: '50',
      published: false,
      userId: null,
    },
  });

  // Log created data
  console.log('Users:', { alice, bob });
  console.log('Subscriptions:', { aliceSub, bobSub });
  console.log('Orders:', {
    aliceOrder1,
    aliceOrder2,
    bobOrder1,
    bobOrder2,
    orphanOrder,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
