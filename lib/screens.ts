export type Screen = { slug: string; title: string };

// Put Stitch-exported HTML files in /public/screens/<slug>.html
// Add the rest of your 23 screens here.
export const SCREENS: Screen[] = [
  { slug: 'active_portfolio_management', title: 'Active Portfolio Management' },
  { slug: 'ai_execution_log_and_roi_tracker', title: 'AI Execution Log & ROI Tracker' },
  { slug: 'asset_analysis_and_ai_hub_1', title: 'Asset Analysis & AI Hub 1' }
];
