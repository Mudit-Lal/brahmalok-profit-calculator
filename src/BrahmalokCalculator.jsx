import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown,
  Factory, 
  Percent, 
  IndianRupee,
  Layers,
  FileText,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Target,
  Zap,
  Settings,
  Info,
  BarChart3,
  PiggyBank,
  Clock,
  Shield
} from 'lucide-react';

// Indian number formatting helper
const formatIndianCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '₹0';
  
  const absNum = Math.abs(num);
  let formatted;
  
  if (absNum >= 10000000) {
    formatted = (absNum / 10000000).toFixed(2) + ' Cr';
  } else if (absNum >= 100000) {
    formatted = (absNum / 100000).toFixed(2) + ' L';
  } else if (absNum >= 1000) {
    formatted = absNum.toLocaleString('en-IN');
  } else {
    formatted = absNum.toFixed(0);
  }
  
  return (num < 0 ? '-₹' : '₹') + formatted;
};

const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  return num.toLocaleString('en-IN');
};

export default function BrahmalokCalculator() {
  // Theme state
  const [isDark, setIsDark] = useState(false);
  
  // Input states
  const [monthlyVolume, setMonthlyVolume] = useState(50000);
  const [currentScrapRate, setCurrentScrapRate] = useState(12);
  const [laborCostPerPart, setLaborCostPerPart] = useState(5);
  const [complexity, setComplexity] = useState('medium');
  const [activeTab, setActiveTab] = useState('calculator');

  // Theme colors
  const theme = {
    bg: isDark ? '#0a0a0a' : '#f8f9fa',
    cardBg: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a2e',
    textSecondary: isDark ? '#888' : '#6b7280',
    textMuted: isDark ? '#666' : '#9ca3af',
    border: isDark ? 'rgba(212, 175, 55, 0.2)' : '#e5e7eb',
    borderLight: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6',
    accent: '#d4af37',
    accentLight: isDark ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.1)',
    success: '#22c55e',
    successBg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)',
    danger: '#ef4444',
    dangerBg: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
    purple: '#8b5cf6',
    purpleBg: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)',
  };

  // Pricing tiers based on complexity
  const pricingTiers = {
    simple: 2,
    medium: 3.5,
    complex: 5
  };

  // Constants
  const UPFRONT_CONSULTING_FEE = 25000;
  const POST_AUTOMATION_SCRAP_RATE = 1;
  const EFFICIENCY_GAIN = 0.30;
  const MATERIAL_COST_MULTIPLIER = 2;

  // Calculations
  const calculations = useMemo(() => {
    const brahmalokPricePerPart = pricingTiers[complexity];
    const monthlyBrahmalokCost = monthlyVolume * brahmalokPricePerPart;
    const costPerDefectivePart = laborCostPerPart * (1 + MATERIAL_COST_MULTIPLIER);
    const currentDefectiveParts = monthlyVolume * (currentScrapRate / 100);
    const postAutomationDefectiveParts = monthlyVolume * (POST_AUTOMATION_SCRAP_RATE / 100);
    const partsSavedFromScrap = currentDefectiveParts - postAutomationDefectiveParts;
    const monthlyScrapSavings = partsSavedFromScrap * costPerDefectivePart;
    const currentMonthlyLaborCost = monthlyVolume * laborCostPerPart;
    const monthlyLaborSavings = currentMonthlyLaborCost * EFFICIENCY_GAIN;
    const grossMonthlySavings = monthlyScrapSavings + monthlyLaborSavings;
    const netMonthlySavings = grossMonthlySavings - monthlyBrahmalokCost;
    const paybackPeriodMonths = netMonthlySavings > 0 
      ? UPFRONT_CONSULTING_FEE / netMonthlySavings 
      : Infinity;
    const annualNetSavings = netMonthlySavings * 12;
    const annualROI = (annualNetSavings / UPFRONT_CONSULTING_FEE) * 100;
    const fiveYearSavings = (netMonthlySavings * 60) - UPFRONT_CONSULTING_FEE;
    const isViable = netMonthlySavings > 0;
    
    return {
      brahmalokPricePerPart,
      monthlyBrahmalokCost,
      currentDefectiveParts,
      postAutomationDefectiveParts,
      partsSavedFromScrap,
      monthlyScrapSavings,
      currentMonthlyLaborCost,
      monthlyLaborSavings,
      grossMonthlySavings,
      netMonthlySavings,
      paybackPeriodMonths,
      annualNetSavings,
      annualROI,
      fiveYearSavings,
      isViable,
      costPerDefectivePart
    };
  }, [monthlyVolume, currentScrapRate, laborCostPerPart, complexity]);

  // Profitability optimizer calculations
  const profitabilityInsights = useMemo(() => {
    const insights = [];
    const brahmalokPrice = pricingTiers[complexity];
    const costPerDefect = laborCostPerPart * (1 + MATERIAL_COST_MULTIPLIER);
    
    // Calculate break-even scrap rate
    const requiredScrapSavings = (monthlyVolume * brahmalokPrice) - (monthlyVolume * laborCostPerPart * EFFICIENCY_GAIN);
    const requiredPartsSaved = requiredScrapSavings / costPerDefect;
    const breakEvenScrapRate = ((requiredPartsSaved / monthlyVolume) + (POST_AUTOMATION_SCRAP_RATE / 100)) * 100;
    
    // Calculate minimum labor cost for profitability
    const scrapSavingsPerPart = (currentScrapRate / 100 - POST_AUTOMATION_SCRAP_RATE / 100) * MATERIAL_COST_MULTIPLIER;
    const minLaborCost = brahmalokPrice / (EFFICIENCY_GAIN + scrapSavingsPerPart + (currentScrapRate / 100 - POST_AUTOMATION_SCRAP_RATE / 100));

    if (!calculations.isViable) {
      // Not profitable - give specific advice
      if (currentScrapRate < breakEvenScrapRate && breakEvenScrapRate <= 25) {
        insights.push({
          type: 'action',
          icon: Percent,
          title: 'Increase Scrap Rate Threshold',
          description: `Your current scrap rate of ${currentScrapRate}% is too low to justify automation costs. You'd need at least ${breakEvenScrapRate.toFixed(1)}% scrap rate, or focus on operations with higher defect rates.`,
          impact: 'high'
        });
      }
      
      if (laborCostPerPart < minLaborCost && minLaborCost <= 50) {
        insights.push({
          type: 'action',
          icon: IndianRupee,
          title: 'Target Higher Labor Cost Operations',
          description: `Current labor cost of ₹${laborCostPerPart}/part is below break-even. Focus on processes with labor costs above ₹${Math.ceil(minLaborCost)}/part.`,
          impact: 'high'
        });
      }
      
      if (complexity !== 'simple') {
        insights.push({
          type: 'suggestion',
          icon: Layers,
          title: 'Consider Simpler Parts First',
          description: `Switching to simple parts (₹2/part vs ₹${brahmalokPrice}/part) could save ₹${formatNumber((brahmalokPrice - 2) * monthlyVolume)}/month in service costs.`,
          impact: 'medium'
        });
      }
      
      insights.push({
        type: 'info',
        icon: TrendingUp,
        title: 'Volume Impact',
        description: `Higher volumes spread the efficiency gains. Consider consolidating production or identifying high-volume product lines for automation first.`,
        impact: 'low'
      });
    } else {
      // Profitable - give optimization tips
      insights.push({
        type: 'success',
        icon: CheckCircle2,
        title: 'Strong Business Case',
        description: `With ${calculations.paybackPeriodMonths.toFixed(1)} month payback and ${calculations.annualROI.toFixed(0)}% annual ROI, automation is highly recommended.`,
        impact: 'high'
      });
      
      if (complexity === 'complex') {
        insights.push({
          type: 'suggestion',
          icon: Lightbulb,
          title: 'Start with Medium Complexity',
          description: `Consider piloting with medium complexity parts first to validate ROI before scaling to complex operations.`,
          impact: 'medium'
        });
      }
      
      const potentialVolumeIncrease = monthlyVolume * 0.2;
      const additionalSavings = potentialVolumeIncrease * (calculations.netMonthlySavings / monthlyVolume);
      insights.push({
        type: 'info',
        icon: Factory,
        title: 'Scale Opportunity',
        description: `A 20% volume increase (${formatNumber(Math.round(potentialVolumeIncrease))} more parts) would add ₹${formatNumber(Math.round(additionalSavings))}/month in net savings.`,
        impact: 'medium'
      });
    }
    
    return {
      insights,
      breakEvenScrapRate: Math.max(0, Math.min(25, breakEvenScrapRate)),
      minLaborCost: Math.max(0, minLaborCost)
    };
  }, [calculations, monthlyVolume, currentScrapRate, laborCostPerPart, complexity]);

  const complexityOptions = [
    { key: 'simple', label: 'Simple', price: '₹2/part' },
    { key: 'medium', label: 'Medium', price: '₹3.5/part' },
    { key: 'complex', label: 'Complex', price: '₹5/part' }
  ];

  const tabs = [
    { key: 'calculator', label: 'Calculator', icon: Calculator },
    { key: 'optimizer', label: 'Profitability Guide', icon: Lightbulb },
    { key: 'report', label: 'Summary Report', icon: FileText }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <header style={{
        background: theme.cardBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${theme.accent}, #b8860b)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                margin: 0,
                color: theme.text
              }}>
                BRAHMALOK
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: theme.textSecondary,
                margin: 0,
                letterSpacing: '0.5px'
              }}>
                Automation ROI Calculator
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              color: theme.accent,
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <TrendingUp size={14} />
              <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>
                Automation That Lifts Everyone Up
              </span>
            </span>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                background: isDark ? theme.accent : theme.border,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2px',
                left: isDark ? '22px' : '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'left 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }}>
                {isDark ? <Moon size={12} color="#1a1a2e" /> : <Sun size={12} color="#f59e0b" />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          background: theme.cardBg,
          padding: '4px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          width: 'fit-content',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.key ? theme.accent : 'transparent',
                color: activeTab === tab.key ? '#fff' : theme.textSecondary,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'calculator' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {/* Input Section */}
            <div style={{
              background: theme.cardBg,
              borderRadius: '16px',
              border: `1px solid ${theme.border}`,
              overflow: 'hidden',
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: theme.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Settings size={18} color={theme.accent} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                    Your Current Operations
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, margin: 0 }}>
                    Enter your production parameters
                  </p>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Monthly Volume */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: theme.textSecondary,
                      fontSize: '0.875rem'
                    }}>
                      <Factory size={16} />
                      Monthly Production Volume
                    </label>
                    <span style={{
                      background: theme.accentLight,
                      color: theme.accent,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {formatNumber(monthlyVolume)} parts
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="500000"
                    step="5000"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${((monthlyVolume - 5000) / (500000 - 5000)) * 100}%, ${theme.borderLight} ${((monthlyVolume - 5000) / (500000 - 5000)) * 100}%, ${theme.borderLight} 100%)`,
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: theme.textMuted, marginTop: '6px' }}>
                    <span>5,000</span>
                    <span>5,00,000</span>
                  </div>
                </div>

                {/* Scrap Rate */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: theme.textSecondary,
                      fontSize: '0.875rem'
                    }}>
                      <Percent size={16} />
                      Current Scrap/Rejection Rate
                    </label>
                    <span style={{
                      background: theme.dangerBg,
                      color: theme.danger,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {currentScrapRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={currentScrapRate}
                    onChange={(e) => setCurrentScrapRate(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: `linear-gradient(to right, ${theme.danger} 0%, ${theme.danger} ${((currentScrapRate - 1) / (25 - 1)) * 100}%, ${theme.borderLight} ${((currentScrapRate - 1) / (25 - 1)) * 100}%, ${theme.borderLight} 100%)`,
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', marginTop: '6px' }}>
                    <span style={{ color: theme.textMuted }}>1%</span>
                    <span style={{ color: theme.success, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Post-automation: 1%
                    </span>
                    <span style={{ color: theme.textMuted }}>25%</span>
                  </div>
                </div>

                {/* Labor Cost */}
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: theme.textSecondary,
                      fontSize: '0.875rem'
                    }}>
                      <IndianRupee size={16} />
                      Labor Cost Per Part
                    </label>
                    <span style={{
                      background: theme.purpleBg,
                      color: theme.purple,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      ₹{laborCostPerPart}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={laborCostPerPart}
                    onChange={(e) => setLaborCostPerPart(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: `linear-gradient(to right, ${theme.purple} 0%, ${theme.purple} ${((laborCostPerPart - 1) / (50 - 1)) * 100}%, ${theme.borderLight} ${((laborCostPerPart - 1) / (50 - 1)) * 100}%, ${theme.borderLight} 100%)`,
                      appearance: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: theme.textMuted, marginTop: '6px' }}>
                    <span>₹1</span>
                    <span>₹50</span>
                  </div>
                </div>

                {/* Complexity */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: theme.textSecondary,
                    fontSize: '0.875rem',
                    marginBottom: '12px'
                  }}>
                    <Layers size={16} />
                    Part Complexity
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {complexityOptions.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => setComplexity(opt.key)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '10px',
                          border: `2px solid ${complexity === opt.key ? theme.accent : theme.border}`,
                          background: complexity === opt.key ? theme.accentLight : 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: complexity === opt.key ? theme.accent : theme.text
                        }}>
                          {opt.label}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: theme.textSecondary,
                          marginTop: '2px'
                        }}>
                          {opt.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assumptions */}
                <div style={{
                  background: theme.borderLight,
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <Info size={18} color={theme.textSecondary} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary, lineHeight: '1.6' }}>
                    <strong style={{ color: theme.text }}>Assumptions:</strong> One-time consulting fee ₹25,000 • Post-automation scrap 1% • Labor efficiency gain 30% • Material cost ≈ 2× labor cost
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div style={{
              background: theme.cardBg,
              borderRadius: '16px',
              border: `1px solid ${theme.border}`,
              overflow: 'hidden',
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: theme.successBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={18} color={theme.success} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                    ROI Analysis
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, margin: 0 }}>
                    Real-time financial impact
                  </p>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                {/* Status Badge */}
                <div style={{
                  background: calculations.isViable ? theme.successBg : theme.dangerBg,
                  border: `1px solid ${calculations.isViable ? theme.success : theme.danger}`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {calculations.isViable ? (
                    <CheckCircle2 size={24} color={theme.success} />
                  ) : (
                    <AlertCircle size={24} color={theme.danger} />
                  )}
                  <div>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: calculations.isViable ? theme.success : theme.danger
                    }}>
                      {calculations.isViable ? 'Automation Recommended' : 'Review Parameters'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                      {calculations.isViable 
                        ? `${calculations.paybackPeriodMonths.toFixed(1)} month payback period`
                        : 'See Profitability Guide for optimization tips'}
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {/* Brahmalok Cost */}
                  <div style={{
                    background: theme.dangerBg,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${isDark ? 'transparent' : 'rgba(239, 68, 68, 0.2)'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <TrendingDown size={14} color={theme.danger} />
                      <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Monthly Service Cost</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: theme.danger }}>
                      {formatIndianCurrency(calculations.monthlyBrahmalokCost)}
                    </div>
                  </div>

                  {/* Scrap Savings */}
                  <div style={{
                    background: theme.successBg,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${isDark ? 'transparent' : 'rgba(34, 197, 94, 0.2)'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <TrendingUp size={14} color={theme.success} />
                      <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Scrap Savings</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: theme.success }}>
                      {formatIndianCurrency(calculations.monthlyScrapSavings)}
                    </div>
                  </div>

                  {/* Labor Savings */}
                  <div style={{
                    background: theme.successBg,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${isDark ? 'transparent' : 'rgba(34, 197, 94, 0.2)'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <TrendingUp size={14} color={theme.success} />
                      <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Labor Savings</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: theme.success }}>
                      {formatIndianCurrency(calculations.monthlyLaborSavings)}
                    </div>
                  </div>

                  {/* Net Savings */}
                  <div style={{
                    background: theme.accentLight,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${theme.accent}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <PiggyBank size={14} color={theme.accent} />
                      <span style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Net Monthly</span>
                    </div>
                    <div style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      color: calculations.netMonthlySavings >= 0 ? theme.success : theme.danger 
                    }}>
                      {formatIndianCurrency(calculations.netMonthlySavings)}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Clock size={14} color={theme.textSecondary} />
                      <span style={{ fontSize: '0.7rem', color: theme.textSecondary }}>Payback</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: theme.accent }}>
                      {calculations.paybackPeriodMonths === Infinity 
                        ? 'N/A' 
                        : calculations.paybackPeriodMonths < 1 
                          ? '<1 mo' 
                          : `${calculations.paybackPeriodMonths.toFixed(1)} mo`}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Target size={14} color={theme.textSecondary} />
                      <span style={{ fontSize: '0.7rem', color: theme.textSecondary }}>Annual ROI</span>
                    </div>
                    <div style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      color: calculations.annualROI > 0 ? theme.success : theme.danger 
                    }}>
                      {calculations.annualROI > 0 ? '+' : ''}{calculations.annualROI.toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Shield size={14} color={theme.textSecondary} />
                      <span style={{ fontSize: '0.7rem', color: theme.textSecondary }}>5-Year</span>
                    </div>
                    <div style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      color: calculations.fiveYearSavings > 0 ? theme.success : theme.danger 
                    }}>
                      {formatIndianCurrency(calculations.fiveYearSavings)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimizer' && (
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
            boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: theme.accentLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lightbulb size={18} color={theme.accent} />
              </div>
              <div>
                <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Profitability Guide
                </h2>
                <p style={{ fontSize: '0.75rem', color: theme.textSecondary, margin: 0 }}>
                  {calculations.isViable 
                    ? 'Optimization recommendations for maximum ROI'
                    : 'Here\'s what needs to change to make automation profitable'}
                </p>
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Break-even Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '4px' }}>
                    Break-even Scrap Rate
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: currentScrapRate >= profitabilityInsights.breakEvenScrapRate ? theme.success : theme.danger 
                  }}>
                    {profitabilityInsights.breakEvenScrapRate.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginTop: '4px' }}>
                    You're at {currentScrapRate}% {currentScrapRate >= profitabilityInsights.breakEvenScrapRate ? '✓' : '✗'}
                  </div>
                </div>

                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '4px' }}>
                    Min Labor Cost for ROI
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: laborCostPerPart >= profitabilityInsights.minLaborCost ? theme.success : theme.danger 
                  }}>
                    ₹{profitabilityInsights.minLaborCost.toFixed(1)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginTop: '4px' }}>
                    You're at ₹{laborCostPerPart} {laborCostPerPart >= profitabilityInsights.minLaborCost ? '✓' : '✗'}
                  </div>
                </div>

                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '4px' }}>
                    Current Status
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: calculations.isViable ? theme.success : theme.danger
                  }}>
                    {calculations.isViable ? 'Profitable' : 'Not Yet'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginTop: '4px' }}>
                    Net: {formatIndianCurrency(calculations.netMonthlySavings)}/mo
                  </div>
                </div>
              </div>

              {/* Insights List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profitabilityInsights.insights.map((insight, index) => (
                  <div
                    key={index}
                    style={{
                      background: insight.type === 'success' ? theme.successBg : 
                                 insight.type === 'action' ? theme.dangerBg : 
                                 theme.borderLight,
                      border: `1px solid ${
                        insight.type === 'success' ? theme.success :
                        insight.type === 'action' ? theme.danger :
                        theme.border
                      }`,
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      gap: '16px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: insight.type === 'success' ? theme.success :
                                 insight.type === 'action' ? theme.danger :
                                 theme.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <insight.icon size={20} color="#fff" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: theme.text
                        }}>
                          {insight.title}
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: insight.impact === 'high' ? theme.accent :
                                     insight.impact === 'medium' ? theme.purple : theme.textMuted,
                          color: '#fff',
                          textTransform: 'uppercase',
                          fontWeight: '600'
                        }}>
                          {insight.impact} impact
                        </span>
                      </div>
                      <p style={{
                        fontSize: '0.8rem',
                        color: theme.textSecondary,
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        {insight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              {!calculations.isViable && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: theme.accentLight,
                  borderRadius: '12px',
                  border: `1px solid ${theme.accent}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <Zap size={18} color={theme.accent} />
                    <span style={{ fontWeight: '600', color: theme.text }}>Quick Path to Profitability</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {profitabilityInsights.breakEvenScrapRate <= 25 && currentScrapRate < profitabilityInsights.breakEvenScrapRate && (
                      <button
                        onClick={() => setCurrentScrapRate(Math.ceil(profitabilityInsights.breakEvenScrapRate))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: theme.accent,
                          color: '#fff',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Set scrap to {Math.ceil(profitabilityInsights.breakEvenScrapRate)}%
                        <ArrowRight size={14} />
                      </button>
                    )}
                    {laborCostPerPart < profitabilityInsights.minLaborCost && profitabilityInsights.minLaborCost <= 50 && (
                      <button
                        onClick={() => setLaborCostPerPart(Math.ceil(profitabilityInsights.minLaborCost))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: 'none',
                          background: theme.purple,
                          color: '#fff',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Set labor cost to ₹{Math.ceil(profitabilityInsights.minLaborCost)}
                        <ArrowRight size={14} />
                      </button>
                    )}
                    {complexity !== 'simple' && (
                      <button
                        onClick={() => setComplexity('simple')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: `1px solid ${theme.border}`,
                          background: theme.cardBg,
                          color: theme.text,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Try simple parts
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
            overflow: 'hidden',
            boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: theme.accentLight,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={18} color={theme.accent} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                    Summary Report
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: theme.textSecondary, margin: 0 }}>
                    Screenshot-ready summary for stakeholders
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: theme.textSecondary
              }}>
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Report Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {/* Input Parameters */}
                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: theme.accent,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Settings size={16} />
                    Input Parameters
                  </h3>
                  <table style={{ width: '100%', fontSize: '0.85rem' }}>
                    <tbody>
                      {[
                        ['Monthly Volume', `${formatNumber(monthlyVolume)} parts`],
                        ['Current Scrap Rate', `${currentScrapRate}%`],
                        ['Labor Cost/Part', `₹${laborCostPerPart}`],
                        ['Part Complexity', complexity.charAt(0).toUpperCase() + complexity.slice(1)],
                        ['Brahmalok Rate', `₹${calculations.brahmalokPricePerPart}/part`]
                      ].map(([label, value], i) => (
                        <tr key={i}>
                          <td style={{ color: theme.textSecondary, padding: '8px 0' }}>{label}</td>
                          <td style={{ color: theme.text, textAlign: 'right', fontWeight: '500' }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculation Breakdown */}
                <div style={{
                  background: theme.borderLight,
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: theme.accent,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Calculator size={16} />
                    Monthly Breakdown
                  </h3>
                  <table style={{ width: '100%', fontSize: '0.85rem' }}>
                    <tbody>
                      <tr>
                        <td style={{ color: theme.textSecondary, padding: '8px 0' }}>Brahmalok Cost</td>
                        <td style={{ color: theme.danger, textAlign: 'right', fontWeight: '500' }}>
                          -{formatIndianCurrency(calculations.monthlyBrahmalokCost)}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: theme.textSecondary, padding: '8px 0' }}>Scrap Savings</td>
                        <td style={{ color: theme.success, textAlign: 'right', fontWeight: '500' }}>
                          +{formatIndianCurrency(calculations.monthlyScrapSavings)}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: theme.textSecondary, padding: '8px 0' }}>Labor Savings</td>
                        <td style={{ color: theme.success, textAlign: 'right', fontWeight: '500' }}>
                          +{formatIndianCurrency(calculations.monthlyLaborSavings)}
                        </td>
                      </tr>
                      <tr style={{ borderTop: `2px solid ${theme.accent}` }}>
                        <td style={{ color: theme.accent, padding: '12px 0 8px', fontWeight: '600' }}>Net Monthly</td>
                        <td style={{ 
                          color: calculations.netMonthlySavings >= 0 ? theme.success : theme.danger, 
                          textAlign: 'right', 
                          fontWeight: '700',
                          padding: '12px 0 8px'
                        }}>
                          {formatIndianCurrency(calculations.netMonthlySavings)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Key Results */}
                <div style={{
                  background: theme.accentLight,
                  borderRadius: '12px',
                  padding: '20px',
                  border: `1px solid ${theme.accent}`
                }}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: theme.accent,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Target size={16} />
                    Key Results
                  </h3>
                  <table style={{ width: '100%', fontSize: '0.85rem' }}>
                    <tbody>
                      {[
                        ['Upfront Investment', '₹25,000'],
                        ['Payback Period', calculations.paybackPeriodMonths === Infinity ? 'N/A' : `${calculations.paybackPeriodMonths.toFixed(1)} months`],
                        ['Annual Net Savings', formatIndianCurrency(calculations.annualNetSavings)],
                        ['Annual ROI', `${calculations.annualROI.toFixed(0)}%`],
                        ['5-Year Cumulative', formatIndianCurrency(calculations.fiveYearSavings)]
                      ].map(([label, value], i) => (
                        <tr key={i}>
                          <td style={{ color: theme.textSecondary, padding: '8px 0' }}>{label}</td>
                          <td style={{ 
                            color: i === 4 ? (calculations.fiveYearSavings >= 0 ? theme.success : theme.danger) : theme.text, 
                            textAlign: 'right', 
                            fontWeight: i === 4 ? '700' : '500' 
                          }}>
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Formula Reference */}
              <div style={{
                marginTop: '24px',
                background: theme.borderLight,
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h3 style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: theme.textSecondary,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Info size={14} />
                  Formula Reference (for verification)
                </h3>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: theme.textMuted, 
                  fontFamily: 'monospace',
                  lineHeight: '2',
                  overflowX: 'auto'
                }}>
                  <div>Service Cost = {formatNumber(monthlyVolume)} × ₹{calculations.brahmalokPricePerPart} = {formatIndianCurrency(calculations.monthlyBrahmalokCost)}</div>
                  <div>Scrap Savings = ({currentScrapRate}% - 1%) × {formatNumber(monthlyVolume)} × ₹{calculations.costPerDefectivePart.toFixed(2)} = {formatIndianCurrency(calculations.monthlyScrapSavings)}</div>
                  <div>Labor Savings = {formatNumber(monthlyVolume)} × ₹{laborCostPerPart} × 30% = {formatIndianCurrency(calculations.monthlyLaborSavings)}</div>
                  <div>Net Monthly = {formatIndianCurrency(calculations.monthlyScrapSavings)} + {formatIndianCurrency(calculations.monthlyLaborSavings)} - {formatIndianCurrency(calculations.monthlyBrahmalokCost)} = {formatIndianCurrency(calculations.netMonthlySavings)}</div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                marginTop: '24px',
                textAlign: 'center',
                paddingTop: '20px',
                borderTop: `1px solid ${theme.border}`
              }}>
                <p style={{ color: theme.accent, fontStyle: 'italic', margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                  "Automation That Lifts Everyone Up"
                </p>
                <p style={{ color: theme.textMuted, fontSize: '0.75rem', margin: 0 }}>
                  Brahmalok — Ethical Automation-as-a-Service for India's MSMEs
                </p>
                <p style={{ color: theme.textMuted, fontSize: '0.7rem', margin: '8px 0 0 0' }}>
                  Supporting: Make in India | Skill India | Atmanirbhar Bharat
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom slider styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 3px solid ${theme.accent};
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 3px solid ${theme.accent};
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        input[type="range"]:focus {
          outline: none;
        }
        @media (max-width: 640px) {
          input[type="range"]::-webkit-slider-thumb {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </div>
  );
}
