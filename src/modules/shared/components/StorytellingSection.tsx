import React, { useState } from 'react';
import { BookOpen, Star, ScrollText, ChevronLeft, ChevronDown, ChevronUp, Clock, Award } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  worldId?: string;
  details?: {
    duration: string;
    objectives: string[];
    rewards: string[];
    fullContent: string;
  };
}

interface StorytellingProps {
  stories: Story[];
  currentStory?: Story;
}

export function StorytellingSection({ stories, currentStory }: StorytellingProps) {
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  const handleStoryClick = (storyId: string) => {
    setExpandedStoryId(expandedStoryId === storyId ? null : storyId);
  };

  const renderStoryCard = (story: Story) => (
    <div
      key={story.id}
      className={`
        relative rounded-lg border transition-all duration-300
        ${story.isCompleted 
          ? 'bg-[#1c2129] border-github-success/30' 
          : 'bg-[#161b22] border-github-border'}
        ${currentStory?.id === story.id ? 'ring-1 ring-github-accent' : ''}
        ${expandedStoryId === story.id ? 'ring-1 ring-github-accent' : ''}
      `}
    >
      <button
        onClick={() => handleStoryClick(story.id)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start gap-3">
          {story.isCompleted ? (
            <Star className="w-5 h-5 text-github-success flex-shrink-0 mt-1" />
          ) : (
            <Star className="w-5 h-5 text-github-text-secondary flex-shrink-0 mt-1" />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium ${
                story.isCompleted ? 'text-github-text-primary' : 'text-github-text-secondary'
              }`}>
                {story.title}
              </h4>
              {expandedStoryId === story.id ? (
                <ChevronUp className="w-4 h-4 text-github-text-secondary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-github-text-secondary" />
              )}
            </div>
            <p className={`text-sm mt-2 ${
              story.isCompleted ? 'text-github-text-secondary' : 'text-github-text-secondary/70'
            }`}>
              {story.content}
            </p>
          </div>
        </div>
      </button>

      {expandedStoryId === story.id && story.details && (
        <div className="px-4 pb-4 pt-2 border-t border-github-border mt-2 space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-github-text-secondary">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{story.details.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-github-text-secondary">
              <Award className="w-4 h-4" />
              <span className="text-sm">{story.details.rewards.length} recompensas</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-github-text-primary whitespace-pre-line text-sm">
              {story.details.fullContent}
            </p>
          </div>

          <div>
            <h4 className="text-github-text-primary font-medium mb-3 text-sm">Objetivos</h4>
            <ul className="space-y-2">
              {story.details.objectives.map((objective, index) => (
                <li key={index} className="flex items-center gap-2 text-github-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-github-accent" />
                  <span className="text-sm">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-github-text-primary font-medium mb-3 text-sm">Recompensas</h4>
            <ul className="space-y-2">
              {story.details.rewards.map((reward, index) => (
                <li key={index} className="flex items-center gap-2 text-github-text-secondary">
                  <Award className="w-4 h-4 text-github-accent" />
                  <span className="text-sm">{reward}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {currentStory?.id === story.id && (
        <div className="absolute -left-[2px] top-0 bottom-0 w-1 bg-github-accent rounded-full" />
      )}
    </div>
  );

  return (
    <div className="bg-github-darker rounded-lg border border-github-border p-6 backdrop-blur-sm bg-opacity-80">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-github-accent" />
          <h3 className="text-github-text-primary font-semibold">História do Mundo Git</h3>
        </div>
      </div>

      <div className="space-y-4">
        {stories.map(story => renderStoryCard(story))}
      </div>
    </div>
  );
}