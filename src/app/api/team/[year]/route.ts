import { TeamResponse } from '@/type/team';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

type Params = {
  year: number
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { year } = params;
  try {
        const teams: TeamResponse[] = await prisma.$queryRaw(Prisma.sql`
        select id, name_full as full_name, name_school as school, mascot, logo, current_logo from teams t left join (
            select team_id as id, logo, current_logo from (
                select team_id, image as logo from logos where team_id is not null and (year_first <= CAST(${year} AS INTEGER) and (year_last >= CAST(${year} AS INTEGER) or year_last is null)) group by team_id, image
            ) as t1 left join (
                select team_id, image as current_logo from logos where team_id is not null and year_last is null
            ) as t2 using (team_id)
            union
            select team_id as id, logo, current_logo from (
                select team_id, image as logo from logos where team_id is not null and (year_first <= CAST(${year} AS INTEGER) and (year_last >= CAST(${year} AS INTEGER) or year_last is null)) group by team_id, image
            ) as t1 right join (
                select team_id, image as current_logo from logos where team_id is not null and year_last is null
            ) as t2 using (team_id)
        ) as t3 using (id) order by id;
        `);
        if (teams) {
          return NextResponse.json(teams, { status: 200 });
        } else {          
          return NextResponse.json({ error: 'Teams not found' }, { status: 404 });
        }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 })
    }
}
