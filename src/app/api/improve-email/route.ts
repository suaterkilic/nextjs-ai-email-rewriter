import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email text is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional email editor. Your task is to rewrite the given email in a more professional, clear, and effective way. Maintain the original message's meaning but use a more professional tone."
        },
        {
          role: "user",
          content: email
        }
      ],
      temperature: 0.7,
    });

    const improvedEmail = completion.choices[0].message.content;

    return NextResponse.json({ improvedEmail });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
} 