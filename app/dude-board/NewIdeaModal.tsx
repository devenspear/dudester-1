"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface NewIdeaModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const categories = ["Agent", "SaaS", "DevTool", "Wellness", "REtech", "Marketplace", "Content tool", "Other"];
const effortSizes = ["S", "M", "L", "XL"];

export default function NewIdeaModal({ onClose, onSuccess }: NewIdeaModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Snapshot
    title: '',
    oneLiner: '',
    category: 'Other',
    tags: [] as string[],
    
    // Step 2: Market & User  
    targetAudience: '',
    fundamentalNeeds: '',
    tamSamSom: '',
    competitiveSet: '',
    
    // Step 3: Product & Execution
    coreJourney: '',
    mustHaveMoment: '',
    dataAiAdvantage: '',
    trustRails: '',
    effortSize: 'M',
    dependencies: '',
    risks: '',
    twoWeekWin: '',
    founderRelevance: 3
  });

  const [tagInput, setTagInput] = useState('');

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      updateFormData({ tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    updateFormData({ tags: formData.tags.filter((_, i) => i !== index) });
  };

  const canProceedToStep2 = formData.title.trim() && formData.oneLiner.trim();
  const canSubmit = canProceedToStep2; // Can submit with just step 1 complete

  const submitIdea = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.length > 0 ? formData.tags : null
        })
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        console.error('API Error:', error);
        alert(`Error: ${error.error || 'Failed to create idea'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert(`Network Error: ${error.message || 'Failed to create idea'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-base-content mb-4">Snapshot</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="≤60 characters"
              maxLength={60}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              One-liner <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.oneLiner}
              onChange={(e) => updateFormData({ oneLiner: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="For [audience] who [job], [product] delivers [value] by [secret sauce]. ≤140 characters"
              maxLength={140}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Tags (3-5 relevant)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 p-2 border border-base-border rounded-lg bg-base-card/50 text-base-content text-sm"
                  placeholder="Add tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn text-sm px-3"
                  disabled={!tagInput.trim() || formData.tags.length >= 5}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-base-border/20 rounded-full text-xs text-base-content flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-base-muted hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-base-content mb-4">Market & User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Target Audience
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => updateFormData({ targetAudience: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="Persona + size proxy"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Fundamental Needs / Jobs-to-be-Done
            </label>
            <textarea
              value={formData.fundamentalNeeds}
              onChange={(e) => updateFormData({ fundamentalNeeds: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="3-5 bullets"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              TAM / SAM / SOM
            </label>
            <textarea
              value={formData.tamSamSom}
              onChange={(e) => updateFormData({ tamSamSom: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="Numbers + 1 source link"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Competitive Set
            </label>
            <textarea
              value={formData.competitiveSet}
              onChange={(e) => updateFormData({ competitiveSet: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="3 names + our wedge"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-base-content mb-4">Product & Execution</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Core User Journey
            </label>
            <textarea
              value={formData.coreJourney}
              onChange={(e) => updateFormData({ coreJourney: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="Happy path in 4-6 steps"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Must-Have Moment
            </label>
            <input
              type="text"
              value={formData.mustHaveMoment}
              onChange={(e) => updateFormData({ mustHaveMoment: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="The 'magic'"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Effort T-shirt
              </label>
              <select
                value={formData.effortSize}
                onChange={(e) => updateFormData({ effortSize: e.target.value })}
                className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              >
                {effortSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-base-content mb-2">
                Founder Relevance
              </label>
              <select
                value={formData.founderRelevance}
                onChange={(e) => updateFormData({ founderRelevance: parseInt(e.target.value) })}
                className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}/5</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Two-Week Win
            </label>
            <textarea
              value={formData.twoWeekWin}
              onChange={(e) => updateFormData({ twoWeekWin: e.target.value })}
              className="w-full p-3 border border-base-border rounded-xl bg-base-card/50 text-base-content"
              placeholder="What we could ship fast"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-2xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-border">
          <div>
            <h2 className="text-xl font-bold text-base-content">New Idea</h2>
            <p className="text-sm text-base-muted">Step {currentStep} of 3</p>
          </div>
          <button onClick={onClose} className="btn btn-ghost">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-3 border-b border-base-border">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded ${
                  step <= currentStep ? 'bg-base-accent' : 'bg-base-border/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <div className="min-h-[400px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-base-border">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 && !canProceedToStep2}
                className="btn btn-accent disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitIdea}
                disabled={!canSubmit || isSubmitting}
                className="btn btn-accent disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Idea'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}