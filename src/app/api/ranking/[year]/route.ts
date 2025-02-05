import { RecordResponse } from '@/type/record';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { RankingResponse } from '@/type/ranking';

export async function GET(request: NextRequest, { params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  try {
        // TODO fix this error
        const records: any = await prisma.rankings.findMany({
          where: {
            year: parseInt(year),
            postseason: 1,
            poll: 'AP Top 25'
          }
        })
        if (records) {
          return NextResponse.json(records, { status: 200 });
        } else {          
          return NextResponse.json({ error: 'Records not found' }, { status: 404 });
        }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 })
    }
}
