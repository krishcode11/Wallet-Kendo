import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are RadhaSphere AI, a highly knowledgeable crypto and blockchain expert. 
          You provide accurate, concise information about:
          - Cryptocurrency market analysis and trends
          - Technical analysis and trading insights
          - Blockchain technology and smart contracts
          - DeFi protocols and yield farming
          - Security best practices and risk management
          - Gas optimization and transaction timing
          
          Keep responses clear, informative, and focused on helping users make informed decisions.
          Always prioritize security and risk management in your advice.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
} 