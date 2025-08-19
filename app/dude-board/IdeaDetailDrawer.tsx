"use client";

import { useState } from "react";
import { X, Star, MessageCircle, Clock, Edit, Archive, Copy } from "lucide-react";

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

interface IdeaDetailDrawerProps {
  idea: IdeaWithScore;
  onClose: () => void;
}

const statusColors = {
  Backlog: "bg-gray-100 text-gray-800 border-gray-200",
  Exploring: "bg-blue-100 text-blue-800 border-blue-200", 
  Building: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Launched: "bg-green-100 text-green-800 border-green-200",
  Archived: "bg-red-100 text-red-800 border-red-200"
};

export default function IdeaDetailDrawer({ idea, onClose }: IdeaDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'market' | 'product' | 'score' | 'discussion' | 'history'>('brief');
  const [userRating, setUserRating] = useState<number>(0);
  const [ratingNote, setRatingNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEdit = () => {
    alert('Edit functionality coming soon! This will open the idea in edit mode.');
  };

  const handleDuplicate = () => {
    // Copy idea data to clipboard as JSON
    const ideaData = {
      title: idea.title + ' (Copy)',
      oneLiner: idea.oneLiner,
      category: idea.category,
      tags: idea.tags,
      targetAudience: idea.targetAudience,
      fundamentalNeeds: idea.fundamentalNeeds,
      tamSamSom: idea.tamSamSom,
      competitiveSet: idea.competitiveSet,
      coreJourney: idea.coreJourney,
      mustHaveMoment: idea.mustHaveMoment,
      dataAiAdvantage: idea.dataAiAdvantage,
      trustRails: idea.trustRails,
      effortSize: idea.effortSize,
      dependencies: idea.dependencies,
      risks: idea.risks,
      twoWeekWin: idea.twoWeekWin,
      founderRelevance: idea.founderRelevance
    };
    
    navigator.clipboard.writeText(JSON.stringify(ideaData, null, 2));
    alert('Idea data copied to clipboard! You can paste this into a new idea form.');
  };

  const handleArchive = async () => {
    if (confirm('Are you sure you want to archive this idea? It will be moved to archived status.')) {
      try {
        // TODO: Implement archive API endpoint
        alert('Archive functionality coming soon! This will change the idea status to Archived.');
      } catch (error) {
        alert('Failed to archive idea.');
      }
    }
  };

  const submitRating = async () => {
    if (userRating === 0) return;
    
    // Validate note requirement for extreme ratings
    if ((userRating <= 2 || userRating === 5) && !ratingNote.trim()) {
      alert('A note is required for ratings of 1-2 stars or 5 stars');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/ideas/${idea.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stars: userRating,
          note: ratingNote.trim() || null
        })
      });

      if (response.ok) {
        alert('Rating submitted successfully!');
        setUserRating(0);
        setRatingNote('');
        // TODO: Refresh the idea data or update parent component
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit rating');
      }
    } catch (error) {
      alert('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { key: 'brief' as const, label: 'Brief' },
    { key: 'market' as const, label: 'Market' },
    { key: 'product' as const, label: 'Product' },
    { key: 'score' as const, label: 'Score' },
    { key: 'discussion' as const, label: 'Discussion' },
    { key: 'history' as const, label: 'History' },
  ];

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const renderBriefTab = () => (
    <div className="space-y-8">
      {/* Key Information Card */}
      <div className="glass rounded-xl p-6 border border-base-border/50">
        <h3 className="font-semibold text-base-content mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-base-accent rounded-full"></div>
          Snapshot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">Title</label>
              <p className="text-base-content font-medium">{idea.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">One-liner</label>
              <p className="text-base-content leading-relaxed">{idea.oneLiner}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">Category</label>
              <span className="inline-block px-3 py-1 bg-base-accent/10 text-base-accent rounded-full text-sm font-medium">
                {idea.category}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">Status</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${statusColors[idea.status as keyof typeof statusColors] || statusColors.Backlog}`}>
                {idea.status}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">DRI (Directly Responsible Individual)</label>
              <p className="text-base-content font-medium">{idea.dri.name || idea.dri.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-muted block mb-1">Founder Relevance</label>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i <= (idea.founderRelevance || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-base-muted">
                  {idea.founderRelevance ? `${idea.founderRelevance}/5` : 'Not rated'}
                </span>
              </div>
            </div>
          </div>
        </div>
        {idea.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-base-border/20">
            <label className="text-sm font-medium text-base-muted block mb-3">Tags</label>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-base-border/10 border border-base-border/20 rounded-full text-sm text-base-content hover:bg-base-border/20 transition-colors">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMarketTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-base-content mb-3">Market & User</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-base-muted">Target Audience</label>
            <p className="text-base-content">{idea.targetAudience || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Fundamental Needs / Jobs-to-be-Done</label>
            <p className="text-base-content whitespace-pre-line">{idea.fundamentalNeeds || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">TAM / SAM / SOM</label>
            <p className="text-base-content">{idea.tamSamSom || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Competitive Set</label>
            <p className="text-base-content">{idea.competitiveSet || 'Not specified'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-base-content mb-3">Product & Moat</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-base-muted">Core User Journey</label>
            <p className="text-base-content">{idea.coreJourney || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Must-Have Moment</label>
            <p className="text-base-content">{idea.mustHaveMoment || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Data/AI Advantage</label>
            <p className="text-base-content">{idea.dataAiAdvantage || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Trust Rails</label>
            <p className="text-base-content">{idea.trustRails || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-base-content mb-3">Execution</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-base-muted">Effort T-shirt</label>
              <p className="text-base-content">{idea.effortSize || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-base-muted">Dependencies</label>
              <p className="text-base-content">{idea.dependencies || 'Not specified'}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Risks & Riskiest Assumption</label>
            <p className="text-base-content">{idea.risks || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-base-muted">Two-Week Win</label>
            <p className="text-base-content">{idea.twoWeekWin || 'Not specified'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScoreTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-base-content mb-3">Overall Rating</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center">
            {renderStars(idea.compositeScore)}
          </div>
          <span className="text-2xl font-bold text-base-content">
            {idea.compositeScore}
          </span>
          <span className="text-base-muted">
            ({idea.totalVotes} vote{idea.totalVotes !== 1 ? 's' : ''})
          </span>
        </div>
        
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-base-muted mb-3">Your Rating</p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="p-1 hover:scale-110 transition-transform"
                onClick={() => setUserRating(star)}
              >
                <Star 
                  className={`h-6 w-6 transition-colors ${
                    star <= userRating 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-base-border hover:text-yellow-400"
                  }`} 
                />
              </button>
            ))}
            {userRating > 0 && (
              <span className="ml-2 text-sm text-base-content">
                {userRating}/5
              </span>
            )}
          </div>
          <textarea
            value={ratingNote}
            onChange={(e) => setRatingNote(e.target.value)}
            className="w-full mt-3 p-3 border border-base-border rounded-xl bg-base-card/50 text-sm text-base-content placeholder-base-muted"
            placeholder={
              (userRating <= 2 || userRating === 5) 
                ? "Note required for extreme ratings..." 
                : "Add a note about your rating..."
            }
            rows={2}
          />
          <button 
            onClick={submitRating}
            disabled={userRating === 0 || isSubmitting}
            className="btn btn-accent mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderDiscussionTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-base-content mb-3">
          Discussion ({idea._count.comments})
        </h3>
        <div className="glass rounded-xl p-6">
          <p className="text-base-muted text-center">
            Comments feature coming soon...
          </p>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-base-content mb-3">History</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-base-muted" />
            <span className="text-base-muted">Created</span>
            <span className="text-base-content">{new Date(idea.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-base-muted" />
            <span className="text-base-muted">Last updated</span>
            <span className="text-base-content">{new Date(idea.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brief': return renderBriefTab();
      case 'market': return renderMarketTab();
      case 'product': return renderProductTab();
      case 'score': return renderScoreTab();
      case 'discussion': return renderDiscussionTab();
      case 'history': return renderHistoryTab();
      default: return renderBriefTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-base-border">
          <div className="flex-1 mr-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-base-content">{idea.title}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[idea.status as keyof typeof statusColors] || statusColors.Backlog}`}>
                {idea.status}
              </span>
            </div>
            <p className="text-base-muted text-sm mb-3">{idea.oneLiner}</p>
            <div className="flex items-center gap-4 text-xs text-base-muted">
              <span>DRI: {idea.dri.name || idea.dri.email}</span>
              <span>•</span>
              <span>Created: {new Date(idea.createdAt).toLocaleDateString()}</span>
              {idea.tags.length > 0 && (
                <>
                  <span>•</span>
                  <span>Tags: {idea.tags.join(', ')}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleEdit}
              className="btn btn-ghost btn-sm flex flex-col items-center px-3 py-2 hover:bg-base-hover"
              title="Edit idea"
            >
              <Edit className="h-4 w-4" />
              <span className="text-xs mt-1">Edit</span>
            </button>
            <button 
              onClick={handleDuplicate}
              className="btn btn-ghost btn-sm flex flex-col items-center px-3 py-2 hover:bg-base-hover"
              title="Duplicate idea"
            >
              <Copy className="h-4 w-4" />
              <span className="text-xs mt-1">Copy</span>
            </button>
            <button 
              onClick={handleArchive}
              className="btn btn-ghost btn-sm flex flex-col items-center px-3 py-2 hover:bg-base-hover text-red-500 hover:text-red-600"
              title="Archive idea"
            >
              <Archive className="h-4 w-4" />
              <span className="text-xs mt-1">Archive</span>
            </button>
            <button 
              onClick={onClose} 
              className="btn btn-ghost btn-sm flex flex-col items-center px-3 py-2 hover:bg-base-hover ml-2"
              title="Close"
            >
              <X className="h-4 w-4" />
              <span className="text-xs mt-1">Close</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-base-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'text-base-accent border-b-2 border-base-accent'
                  : 'text-base-muted hover:text-base-content'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}