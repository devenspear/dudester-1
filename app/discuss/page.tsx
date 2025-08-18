"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { Card } from "@/components/Card";
import { MessageSquare, Bell, Lock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

// Mock data for demo
const MOCK_FOUNDERS = ["Deven Spear", "Michael C. Worthington", "Sean Harrison", "David Wilson"];

export default function Discuss() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Welcome to Dudester Discussions",
      content: "This is our private discussion space. All posts here trigger email notifications to the four founders.",
      author: "Deven Spear",
      timestamp: new Date(Date.now() - 3600000),
      replies: []
    }
  ]);
  
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  
  // Use email from session if available; fallback to first founder
  const getCurrentUser = () => {
    if (typeof document !== "undefined") {
      const m = document.cookie.match(/(?:^|; )session=([^;]+)/);
      if (m) {
        try {
          const token = decodeURIComponent(m[1]);
          const parts = token.split(".");
          if (parts.length > 1) {
            const json = typeof atob !== "undefined" ? atob(parts[1]) : Buffer.from(parts[1], "base64").toString();
            const data = JSON.parse(json) as { email?: string };
            if (data.email) return data.email;
          }
        } catch {}
      }
    }
    return MOCK_FOUNDERS[0];
  };
  const currentUser = getCurrentUser();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: currentUser,
      timestamp: new Date(),
      replies: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  const handleReply = (postId: string) => {
    if (!replyContent) return;

    const reply: Reply = {
      id: Date.now().toString(),
      content: replyContent,
      author: currentUser,
      timestamp: new Date()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, reply] }
        : post
    ));

    setReplyContent("");
    setReplyingTo(null);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Section title="Private Discussion" kicker="Founders Only">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Compose */}
          <Card title="Start a Discussion" icon={<MessageSquare className="h-5 w-5" />}>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full rounded-2xl border border-base-border bg-base-bg p-3 text-sm"
                placeholder="What's on your mind?"
                required
              />
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full rounded-2xl border border-base-border bg-base-bg p-3 h-32 text-sm resize-none"
                placeholder="Share your thoughts with the founders..."
                required
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-base-muted">Posting as {currentUser}</span>
                <button type="submit" className="btn btn-accent">
                  Post & Notify All
                </button>
              </div>
            </form>
          </Card>

          {/* Thread */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-base">{post.title}</h3>
                    <p className="text-xs text-base-muted mt-1">
                      {post.author} • {formatDate(post.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed">{post.content}</p>
                  
                  {/* Replies */}
                  {post.replies.length > 0 && (
                    <div className="border-t border-base-border pt-3 space-y-3">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="pl-4 border-l-2 border-base-border">
                          <p className="text-sm">{reply.content}</p>
                          <p className="text-xs text-base-muted mt-1">
                            {reply.author} • {formatDate(reply.timestamp)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply form */}
                  {replyingTo === post.id ? (
                    <div className="border-t border-base-border pt-3">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full rounded-xl border border-base-border bg-base-bg p-2 h-20 text-sm resize-none"
                        placeholder="Write a reply..."
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleReply(post.id)}
                          className="btn btn-primary text-xs"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent("");
                          }}
                          className="btn text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(post.id)}
                      className="text-xs text-base-accent hover:underline"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card title="Notifications" icon={<Bell className="h-5 w-5" />}>
            <p className="text-sm text-base-muted">
              All founders receive email alerts for new posts. Individual notification preferences coming soon.
            </p>
            <div className="mt-3 space-y-2">
              {MOCK_FOUNDERS.map((founder) => (
                <div key={founder} className="flex items-center gap-2 text-xs">
                  <div className="h-2 w-2 rounded-full bg-base-mint" />
                  {founder}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Privacy" icon={<Lock className="h-5 w-5" />}>
            <p className="text-sm text-base-muted">
              This is a members-only area. Only authenticated founders can view and post here.
            </p>
            <p className="text-xs text-base-muted mt-2">
              Database persistence and email integration coming next.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}