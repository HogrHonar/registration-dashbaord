import { NextRequest } from 'next/server';
import { moveRegistration } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const { id, data } = await request.json();
    
    if (!id || !data) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    await moveRegistration(id, data);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}




