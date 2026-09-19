import React, { useState } from 'react';
import { Check, RefreshCw } from 'lucide-react';


export const SettingsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'guardrails' | 'behavior' | 'channels'>('guardrails');
  
  // Safeguard Toggles state
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);
  const [escalateNegativeSentiment, setEscalateNegativeSentiment] = useState(true);
  const [autoBookCalendar, setAutoBookCalendar] = useState(true);
  const [sarvamTranslation, setSarvamTranslation] = useState(true);
  const [cogneeGraphMemory, setCogneeGraphMemory] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const handleReset = () => {
    setRequireHumanApproval(true);
    setEscalateNegativeSentiment(true);
    setAutoBookCalendar(true);
    setSarvamTranslation(true);
    setCogneeGraphMemory(true);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e2634]">
        <div>
          <h2 className="font-heading font-extrabold text-[#f8fafc] text-xl">
            Agent Settings & Guardrails
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Configure safety thresholds, channel routing, and autonomous behavior limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#121721] hover:bg-[#18202c] border border-[#232d3f] text-[#94a3b8] hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="ivy-lime-btn px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/20 flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#0b0e14]" />
                Saved Changes!
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 bg-[#121721] p-1.5 rounded-2xl border border-[#232d3f] w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('guardrails')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'guardrails'
              ? 'bg-[#1e2736] text-[#a3e635] font-bold shadow-xs'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Safety Guardrails
        </button>
        <button
          onClick={() => setActiveSubTab('behavior')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'behavior'
              ? 'bg-[#1e2736] text-[#a3e635] font-bold shadow-xs'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Agent Behavior
        </button>
        <button
          onClick={() => setActiveSubTab('channels')}
          className={`px-4 py-2 rounded-xl transition ${
            activeSubTab === 'channels'
              ? 'bg-[#1e2736] text-[#a3e635] font-bold shadow-xs'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Channels & Integrations
        </button>
      </div>

      {/* Settings Panel */}
      <div className="ivy-card p-6 rounded-2xl border border-[#232d3f] space-y-5">
        
        {activeSubTab === 'guardrails' && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-white text-base">
              Autonomous Safety Safeguards
            </h3>

            <div className="space-y-3">
              {/* Toggle 1 */}
              <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Human Approval for External Sends</h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    Require human sign-off on emails, WhatsApp messages, or quotes with confidence &lt; 75%.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={requireHumanApproval}
                  onChange={(e) => setRequireHumanApproval(e.target.checked)}
                  className="w-5 h-5 accent-[#a3e635] cursor-pointer"
                />
              </div>

              {/* Toggle 2 */}
              <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Escalate on Strongly Negative Sentiment</h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    Automatically route tickets with churn risk or severe frustration directly to manager approval.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={escalateNegativeSentiment}
                  onChange={(e) => setEscalateNegativeSentiment(e.target.checked)}
                  className="w-5 h-5 accent-[#a3e635] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'behavior' && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-white text-base">
              Agent Intelligence & Memory Controls
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Cognee Knowledge Graph Recall</h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    Retrieve graph triples <code className="text-[#a3e635]">(Subject)-[RELATION]-(Object)</code> for contextual reasoning.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={cogneeGraphMemory}
                  onChange={(e) => setCogneeGraphMemory(e.target.checked)}
                  className="w-5 h-5 accent-[#a3e635] cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Auto-Book Google Calendar Meetings</h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    Allow Ivy to check calendar slots and create invites for qualified leads automatically.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoBookCalendar}
                  onChange={(e) => setAutoBookCalendar(e.target.checked)}
                  className="w-5 h-5 accent-[#a3e635] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'channels' && (
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-white text-base">
              Multilingual Voice & Channel Settings
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Sarvam AI Native Language Engine</h4>
                  <p className="text-[11px] text-[#94a3b8]">
                    Enable Kannada & Hindi voice note STT (<code className="text-[#a3e635]">saaras:v3</code>) and translation (<code className="text-[#a3e635]">sarvam-translate:v1</code>).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={sarvamTranslation}
                  onChange={(e) => setSarvamTranslation(e.target.checked)}
                  className="w-5 h-5 accent-[#a3e635] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
