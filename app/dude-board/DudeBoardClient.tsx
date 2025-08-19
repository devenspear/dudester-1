"use client";

import { useState } from "react";
import { Plus, Filter, Download, Star, MessageCircle, Clock, User } from "lucide-react";
import IdeaDetailDrawer from "./IdeaDetailDrawer";
import NewIdeaModal from "./NewIdeaModal";

interface IdeaWithScore {
  id: string;
  title: string;
  oneLiner: string;
  category: string;
  status: string;
  tags: string[];
  compositeScore: number;
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Market & User fields
  targetAudience?: string | null;
  fundamentalNeeds?: string | null;
  tamSamSom?: string | null;
  competitiveSet?: string | null;
  
  // Product & Moat fields
  coreJourney?: string | null;
  mustHaveMoment?: string | null;
  dataAiAdvantage?: string | null;
  trustRails?: string | null;
  
  // Execution fields
  effortSize?: string | null;
  dependencies?: string | null;
  risks?: string | null;
  twoWeekWin?: string | null;
  founderRelevance?: number | null;
  
  dri: {
    id: string;
    name: string | null;
    email: string;
  };
  _count: {
    comments: number;
  };
}

interface LeaderboardStats {
  topIdea: {
    title: string;
    score: number;
    status: string;
  } | null;
  averageScore: number;
  newThisWeek: number;
  inSpike: number;
  conversionRate: number;
}

interface DudeBoardClientProps {
  initialIdeas: IdeaWithScore[];
  leaderboardStats: LeaderboardStats;
}

const statusColors = {
  Backlog: "bg-base-border/30 text-base-muted border-base-border",
  Exploring: "bg-blue-500/10 text-blue-600 border-blue-200", 
  Building: "bg-base-accent/10 text-base-accent border-base-accent/30",
  Launched: "bg-base-mint/10 text-base-mint border-base-mint/30",
  Archived: "bg-red-500/10 text-red-600 border-red-200"
};

const categoryColors = {
  Agent: "bg-purple-500/10 text-purple-600",
  SaaS: "bg-blue-500/10 text-blue-600",
  DevTool: "bg-base-mint/10 text-base-mint",
  Wellness: "bg-pink-500/10 text-pink-600",
  REtech: "bg-base-accent/10 text-base-accent",
  Marketplace: "bg-indigo-500/10 text-indigo-600",
  "Content tool": "bg-yellow-500/10 text-yellow-600",
  Other: "bg-base-border/30 text-base-muted"
};

export default function DudeBoardClient({ initialIdeas, leaderboardStats }: DudeBoardClientProps) {
  console.log('DudeBoardClient initialIdeas:', initialIdeas?.length || 0, 'ideas');
  const [ideas, setIdeas] = useState<IdeaWithScore[]>(initialIdeas);
  const [selectedIdea, setSelectedIdea] = useState<IdeaWithScore | null>(null);
  const [sortBy, setSortBy] = useState<'top' | 'hot' | 'new'>('top');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNewIdeaModal, setShowNewIdeaModal] = useState<boolean>(false);

  const refreshIdeas = async () => {
    try {
      const response = await fetch('/api/ideas');
      if (response.ok) {
        const data = await response.json();
        setIdeas(data.ideas);
      }
    } catch (error) {
      console.error('Failed to refresh ideas:', error);
    }
  };

  const handleNewIdeaSuccess = () => {
    refreshIdeas();
  };

  const exportToCSV = () => {
    const csvContent = [
      // Headers
      'Title,One-liner,Category,Status,Score,Votes,DRI,Tags,Created',
      // Data rows
      ...ideas.map(idea => [
        `"${idea.title}"`,
        `"${idea.oneLiner}"`,
        idea.category,
        idea.status,
        idea.compositeScore,
        idea.totalVotes,
        `"${idea.dri.name || idea.dri.email}"`,
        `"${idea.tags.join(', ')}"`,
        new Date(idea.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dude-board-ideas-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sort ideas based on selected criteria
  const sortedIdeas = [...ideas].sort((a, b) => {
    switch (sortBy) {
      case 'top':
        return b.compositeScore - a.compositeScore;
      case 'new':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'hot':
        // Simple hot score: composite score + recency boost
        const aHot = a.compositeScore + (Date.now() - new Date(a.updatedAt).getTime()) / (1000 * 60 * 60 * 24) * 0.1;
        const bHot = b.compositeScore + (Date.now() - new Date(b.updatedAt).getTime()) / (1000 * 60 * 60 * 24) * 0.1;
        return bHot - aHot;
      default:
        return 0;
    }
  });

  // Filter ideas by status
  const filteredIdeas = filterStatus === 'all' 
    ? sortedIdeas 
    : sortedIdeas.filter(idea => idea.status === filterStatus);

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Leaderboard Header */}
      <div className="idea-card rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">
              {leaderboardStats.topIdea?.score || 0}
            </div>
            <div className="text-sm text-base-muted">Top Idea Score</div>
            {leaderboardStats.topIdea && (
              <div className="text-xs text-base-muted mt-1 line-clamp-2">
                {leaderboardStats.topIdea.title}
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">
              {leaderboardStats.averageScore}
            </div>
            <div className="text-sm text-base-muted">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">
              {leaderboardStats.newThisWeek}
            </div>
            <div className="text-sm text-base-muted">New This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">
              {leaderboardStats.inSpike}
            </div>
            <div className="text-sm text-base-muted">In Spike</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-base-content">
              {leaderboardStats.conversionRate}%
            </div>
            <div className="text-sm text-base-muted">Conversion (90d)</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNewIdeaModal(true)}
            className="btn btn-accent"
          >
            <Plus className="h-4 w-4" />
            New Idea
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSortBy('top')}
              className={`btn ${sortBy === 'top' ? 'btn-accent' : ''}`}
            >
              Top
            </button>
            <button 
              onClick={() => setSortBy('hot')}
              className={`btn ${sortBy === 'hot' ? 'btn-accent' : ''}`}
            >
              Hot
            </button>
            <button 
              onClick={() => setSortBy('new')}
              className={`btn ${sortBy === 'new' ? 'btn-accent' : ''}`}
            >
              New
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-base-border rounded-xl bg-base-card/95 text-base-content"
          >
            <option value="all">All Status</option>
            <option value="Backlog">Backlog</option>
            <option value="Exploring">Exploring</option>
            <option value="Building">Building</option>
            <option value="Launched">Launched</option>
          </select>
          <button className="btn">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button onClick={exportToCSV} className="btn">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredIdeas.map((idea, index) => (
          <div
            key={idea.id}
            className="idea-card card-hover p-6 cursor-pointer animate-card rounded-2xl"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelectedIdea(idea)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[idea.status as keyof typeof statusColors] || statusColors.Backlog}`}>
                  {idea.status}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[idea.category as keyof typeof categoryColors] || categoryColors.Other}`}>
                  {idea.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {renderStars(idea.compositeScore)}
                </div>
                <span className="text-sm font-medium text-base-content ml-1">
                  {idea.compositeScore}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-semibold text-base-content mb-2 line-clamp-2">
              {idea.title}
            </h3>
            <p className="text-sm text-base-muted mb-4 line-clamp-3">
              {idea.oneLiner}
            </p>

            {/* Tags */}
            {idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {idea.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-base-border/20 rounded-full text-xs text-base-muted">
                    {tag.trim()}
                  </span>
                ))}
                {idea.tags.length > 3 && (
                  <span className="px-2 py-1 bg-base-border/20 rounded-full text-xs text-base-muted">
                    +{idea.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-base-muted">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {idea.dri.name || idea.dri.email}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {idea._count.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {idea.totalVotes}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(idea.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIdeas.length === 0 && (
        <div className="text-center py-16">
          <div className="text-base-muted mb-6 text-lg">
            {filterStatus === 'all' 
              ? "No ideas yet. Click New Idea to log your first spark."
              : "Nothing matches. Clear filters or broaden tags."
            }
          </div>
          <button 
            onClick={() => setShowNewIdeaModal(true)}
            className="btn btn-accent"
          >
            <Plus className="h-4 w-4" />
            Create First Idea
          </button>
        </div>
      )}

      {/* Idea Detail Drawer */}
      {selectedIdea && (
        <IdeaDetailDrawer 
          idea={selectedIdea} 
          onClose={() => setSelectedIdea(null)} 
        />
      )}

      {/* New Idea Modal */}
      {showNewIdeaModal && (
        <NewIdeaModal
          onClose={() => setShowNewIdeaModal(false)}
          onSuccess={handleNewIdeaSuccess}
        />
      )}
    </div>
  );
}