'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, Users, Mail, TrendingUp, DollarSign, Eye, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ROICalculatorPage() {
  const [teamSize, setTeamSize] = useState(50);
  const [emailsPerDay, setEmailsPerDay] = useState(30);
  const [clickRate, setClickRate] = useState(1.5);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgDealValue, setAvgDealValue] = useState(500);

  const results = useMemo(() => {
    const dailyImpressions = teamSize * emailsPerDay;
    const monthlyImpressions = dailyImpressions * 22; // business days
    const yearlyImpressions = monthlyImpressions * 12;
    const monthlyClicks = Math.round(monthlyImpressions * (clickRate / 100));
    const monthlyConversions = Math.round(monthlyClicks * (conversionRate / 100));
    const monthlyRevenue = monthlyConversions * avgDealValue;
    const yearlyRevenue = monthlyRevenue * 12;

    // Equivalent ad spend calculation (avg CPC of $2.50 for B2B)
    const equivalentAdSpend = monthlyClicks * 2.5;

    return {
      dailyImpressions,
      monthlyImpressions,
      yearlyImpressions,
      monthlyClicks,
      monthlyConversions,
      monthlyRevenue,
      yearlyRevenue,
      equivalentAdSpend,
    };
  }, [teamSize, emailsPerDay, clickRate, conversionRate, avgDealValue]);

  const formatNumber = (n: number) => n.toLocaleString();
  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;

  return (
    <>
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm mb-6">
            <Calculator className="h-4 w-4" />
            Free Tool
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Email Signature ROI Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your team&apos;s email signatures are a hidden marketing channel. Calculate how many
            impressions, clicks, and revenue they can generate.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Your Numbers</h2>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="teamSize" className="text-base font-medium">Team Size</Label>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{teamSize} people</span>
                  </div>
                  <input
                    id="teamSize"
                    type="range"
                    min={1}
                    max={500}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>1</span>
                    <span>500</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailsPerDay" className="text-base font-medium">Emails Per Person/Day</Label>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{emailsPerDay} emails</span>
                  </div>
                  <input
                    id="emailsPerDay"
                    type="range"
                    min={5}
                    max={100}
                    value={emailsPerDay}
                    onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>5</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clickRate" className="text-base font-medium">Banner Click Rate (%)</Label>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{clickRate}%</span>
                  </div>
                  <input
                    id="clickRate"
                    type="range"
                    min={0.1}
                    max={5}
                    step={0.1}
                    value={clickRate}
                    onChange={(e) => setClickRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.1%</span>
                    <span>5%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="conversionRate" className="text-base font-medium">Landing Page Conversion (%)</Label>
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{conversionRate}%</span>
                  </div>
                  <input
                    id="conversionRate"
                    type="range"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avgDealValue" className="text-base font-medium">Average Deal Value ($)</Label>
                  <Input
                    id="avgDealValue"
                    type="number"
                    min={1}
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value) || 0)}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="sticky top-8 space-y-6">
                <h2 className="text-2xl font-bold">Your Signature ROI</h2>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 text-center">
                    <Eye className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-emerald-700">{formatNumber(results.monthlyImpressions)}</div>
                    <div className="text-sm text-emerald-600 mt-1">Monthly Impressions</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                    <MousePointer className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-700">{formatNumber(results.monthlyClicks)}</div>
                    <div className="text-sm text-blue-600 mt-1">Monthly Clicks</div>
                  </div>
                  <div className="bg-violet-50 border border-violet-100 rounded-xl p-5 text-center">
                    <TrendingUp className="h-6 w-6 text-violet-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-violet-700">{results.monthlyConversions}</div>
                    <div className="text-sm text-violet-600 mt-1">Monthly Conversions</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center">
                    <DollarSign className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-amber-700">{formatCurrency(results.monthlyRevenue)}</div>
                    <div className="text-sm text-amber-600 mt-1">Monthly Revenue</div>
                  </div>
                </div>

                {/* Annual summary */}
                <div className="bg-gray-900 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Annual Impact</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Yearly Impressions</span>
                      <span className="text-xl font-bold">{formatNumber(results.yearlyImpressions)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Yearly Revenue</span>
                      <span className="text-xl font-bold text-emerald-400">{formatCurrency(results.yearlyRevenue)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Equivalent Ad Spend/mo</span>
                        <span className="text-lg font-bold text-amber-400">{formatCurrency(results.equivalentAdSpend)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Based on $2.50 avg. B2B CPC</p>
                    </div>
                  </div>
                </div>

                {/* Context */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">How we calculate this</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>{teamSize} people x {emailsPerDay} emails x 22 business days = {formatNumber(results.monthlyImpressions)} impressions/mo</li>
                    <li>{formatNumber(results.monthlyImpressions)} impressions x {clickRate}% CTR = {formatNumber(results.monthlyClicks)} clicks/mo</li>
                    <li>{formatNumber(results.monthlyClicks)} clicks x {conversionRate}% conversion = {results.monthlyConversions} conversions/mo</li>
                    <li>{results.monthlyConversions} conversions x {formatCurrency(avgDealValue)} = {formatCurrency(results.monthlyRevenue)}/mo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Benchmarks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">30</div>
              <div className="text-sm text-gray-600 mb-4">Avg. emails sent per person per day</div>
              <div className="text-xs text-gray-400">Source: Radicati Group</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">1-3%</div>
              <div className="text-sm text-gray-600 mb-4">Typical signature banner click rate</div>
              <div className="text-xs text-gray-400">Higher than display ads (0.1%)</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <div className="text-sm text-gray-600 mb-4">Cost per impression</div>
              <div className="text-xs text-gray-400">vs. $2-5 CPM for paid ads</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start capturing this ROI today
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Siggly makes it easy to add campaign banners to your team&apos;s signatures.
            Track clicks, measure conversions, and prove your ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
