import { NextResponse } from 'next/server';
import { Hunters } from '@/data/characters';

export async function GET() {
  return NextResponse.json(Hunters);
}
