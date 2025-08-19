import Section from "@/components/Section";
import { DUDE_BOARD_COPY } from "@/content";
import DudeBoardClient from "./DudeBoardClient";
import { prisma } from "@/lib/prisma";

export default async function DudeBoardPage() {
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

  // Calculate composite scores for each idea
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

  // Calculate leaderboard stats
  const totalIdeas = ideas.length;
  const newThisWeek = ideas.filter(idea => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return idea.createdAt > weekAgo;
  }).length;
  
  const inSpike = ideas.filter(idea => idea.status === 'Exploring').length;
  const averageScore = ideasWithScores.length > 0 
    ? Math.round((ideasWithScores.reduce((sum, idea) => sum + idea.compositeScore, 0) / ideasWithScores.length) * 10) / 10
    : 0;

  const topIdea = ideasWithScores.sort((a, b) => b.compositeScore - a.compositeScore)[0];

  const leaderboardStats = {
    topIdea: topIdea ? {
      title: topIdea.title,
      score: topIdea.compositeScore,
      status: topIdea.status
    } : null,
    averageScore,
    newThisWeek,
    inSpike,
    conversionRate: 0 // TODO: Calculate based on actual drops
  };

  return (
    <Section title={DUDE_BOARD_COPY.headline} kicker="Ideas">
      <p className="text-base text-base-muted max-w-3xl mb-8">{DUDE_BOARD_COPY.subhead}</p>
      
      <DudeBoardClient 
        initialIdeas={ideasWithScores} 
        leaderboardStats={leaderboardStats}
      />
    </Section>
  );
}