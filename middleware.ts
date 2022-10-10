import type { NextFetchEvent } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log('hello from middleware');
  console.log('got request', req);
  return NextResponse.next();
}
