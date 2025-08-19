import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { stars, note } = await request.json();
    const ideaId = params.id;
    
    // For development, get the first user from the database
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 401 });
    }
    const userId = user.id;

    // Validate input
    if (!stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Stars must be between 1-5" }, { status: 400 });
    }

    // Require note for extreme ratings
    if ((stars <= 2 || stars === 5) && !note?.trim()) {
      return NextResponse.json(
        { error: "A note is required for ratings of 1-2 stars or 5 stars" }, 
        { status: 400 }
      );
    }

    // Upsert the vote
    const vote = await prisma.vote.upsert({
      where: {
        ideaId_userId: {
          ideaId,
          userId
        }
      },
      create: {
        ideaId,
        userId,
        stars,
        note: note?.trim() || null
      },
      update: {
        stars,
        note: note?.trim() || null
      }
    });

    return NextResponse.json({ success: true, vote });

  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Failed to submit vote" }, { status: 500 });
  }
}