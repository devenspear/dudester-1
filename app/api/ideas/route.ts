import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // For development, get the first user from the database
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 401 });
    }
    const userId = user.id;
    
    // Validate required fields
    if (!data.title?.trim() || !data.oneLiner?.trim()) {
      return NextResponse.json(
        { error: "Title and one-liner are required" }, 
        { status: 400 }
      );
    }

    // Create the idea
    const idea = await prisma.idea.create({
      data: {
        title: data.title.trim(),
        oneLiner: data.oneLiner.trim(),
        category: data.category || "Other",
        status: "Backlog",
        driId: userId,
        tags: Array.isArray(data.tags) ? data.tags : [],
        
        // Market & User
        targetAudience: data.targetAudience?.trim() || null,
        fundamentalNeeds: data.fundamentalNeeds?.trim() || null,
        tamSamSom: data.tamSamSom?.trim() || null,
        competitiveSet: data.competitiveSet?.trim() || null,
        
        // Product & Moat
        coreJourney: data.coreJourney?.trim() || null,
        mustHaveMoment: data.mustHaveMoment?.trim() || null,
        dataAiAdvantage: data.dataAiAdvantage?.trim() || null,
        trustRails: data.trustRails?.trim() || null,
        
        // Execution
        effortSize: data.effortSize || null,
        dependencies: data.dependencies?.trim() || null,
        risks: data.risks?.trim() || null,
        twoWeekWin: data.twoWeekWin?.trim() || null,
        founderRelevance: data.founderRelevance || null,
      },
      include: {
        dri: {
          select: { id: true, name: true, email: true }
        },
        votes: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, idea });

  } catch (error) {
    console.error("Create idea error:", error);
    return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        dri: {
          select: { id: true, name: true, email: true }
        },
        votes: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate composite scores
    const ideasWithScores = ideas.map(idea => {
      const totalVotes = idea.votes.length;
      const averageScore = totalVotes > 0 
        ? idea.votes.reduce((sum, vote) => sum + vote.stars, 0) / totalVotes 
        : 0;
      
      return {
        ...idea,
        compositeScore: Math.round(averageScore * 10) / 10,
        totalVotes,
        tags: Array.isArray(idea.tags) ? idea.tags : []
      };
    });

    return NextResponse.json({ ideas: ideasWithScores });

  } catch (error) {
    console.error("Get ideas error:", error);
    return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
  }
}