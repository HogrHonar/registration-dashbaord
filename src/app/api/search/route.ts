import { NextRequest } from 'next/server';
import { getPreRegistrationData } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  if (query.length < 2) {
    return Response.json([]);
  }
  
  try {
    const results = await getPreRegistrationData(query);
    return Response.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}