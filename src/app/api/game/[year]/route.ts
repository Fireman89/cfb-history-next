import { ScheduleResponse } from '@/type/schedule';
import { TeamResponse } from '@/type/team';
import { GameResponse } from '@/type/teamGame';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Params = {
  year: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const params = await context?.params;
  const { year } = params;
  try {
        // TODO fix this error
        const schedules: GameResponse[] = await prisma.games.findMany({
          where: {
            year: parseInt(year),
            completed: 1,
          }
        })
        if (schedules) {
          return NextResponse.json(schedules, { status: 200 });
        } else {          
          return NextResponse.json({ error: 'Games not found' }, { status: 404 });
        }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
    }
}
