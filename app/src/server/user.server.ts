import { redirect } from "react-router";
import { prisma } from "~/db.server";

export const getUser = async (sessionId: string) => {
  const sessionWithUser = await prisma.session.findFirst({
    where: {
      id: sessionId,
      AND: {
        expiresAt: {
          gte: new Date(),
        },
      },
    },
    include: {
      user: {
        include: {
          picture: true,
        },
      },
    },
  });

  if (!sessionWithUser) return null;

  return sessionWithUser.user;
};
