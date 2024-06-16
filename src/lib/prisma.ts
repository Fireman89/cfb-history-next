import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

prisma = new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient({
//     datasources: {
//         db: {
//           url: process.env.DATABASE_URL,
//         },
//       },
//   });
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({
//         datasources: {
//             db: {
//               url: process.env.DATABASE_URL,
//             },
//           },
//       });
//   }
//   prisma = global.prisma;
// }

export default prisma;
