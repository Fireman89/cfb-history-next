import { RecordResponse } from '@/type/record';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { RankingResponse } from '@/type/ranking';

export async function GET(request: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  try {
    const rankings: any = await prisma.rankings.findMany({
      where: {
        year: parseInt(year),
        postseason: 1,
        poll: 'AP Top 25'
      }
    })
    if (rankings) {
      return NextResponse.json(rankings, { status: 200 });
    } else {          
      return NextResponse.json({ error: 'Rankings not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching rankings for year:', year);

    return NextResponse.json(
      { error: `Failed to fetch rankings for year ${year}. ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
