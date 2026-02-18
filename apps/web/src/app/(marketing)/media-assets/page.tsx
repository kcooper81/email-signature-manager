'use client';

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

interface Asset {
  name: string;
  file: string;
  size: string;
  platform: string;
  category: 'profile' | 'banner' | 'icon' | 'mockup';
}

const assets: Asset[] = [
  // Profile Images
  { name: 'YouTube Profile', file: '/youtube-profile.png', size: '800×800', platform: 'YouTube', category: 'profile' },
  { name: 'Google Marketplace', file: '/google-marketplace-icon.png', size: '512×512', platform: 'Google Workspace', category: 'profile' },
  { name: 'X (Twitter) Profile', file: '/x-profile.png', size: '400×400', platform: 'X.com', category: 'profile' },
  { name: 'Instagram Profile', file: '/instagram-profile.png', size: '320×320', platform: 'Instagram', category: 'profile' },
  { name: 'LinkedIn Profile', file: '/linkedin-profile.png', size: '300×300', platform: 'LinkedIn', category: 'profile' },
  { name: 'Facebook Profile', file: '/facebook-profile.png', size: '180×180', platform: 'Facebook', category: 'profile' },
  
  // Banners
  { name: 'YouTube Banner', file: '/youtube-banner.png', size: '2560×1440', platform: 'YouTube', category: 'banner' },
  { name: 'LinkedIn Banner', file: '/linkedin-banner.png', size: '1584×396', platform: 'LinkedIn', category: 'banner' },
  { name: 'X (Twitter) Banner', file: '/x-banner.png', size: '1500×500', platform: 'X.com', category: 'banner' },
  
  // Icons & Logos
  { name: 'Siggly Logo', file: '/siggly-logo.png', size: 'Vector', platform: 'All Platforms', category: 'icon' },
];

function AssetCard({ asset }: { asset: Asset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`/public${asset.file}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="aspect-video bg-[repeating-conic-gradient(#f3f4f6_0%_25%,transparent_0%_50%)_50%/20px_20px] p-6 flex items-center justify-center">
        <img 
          src={asset.file} 
          alt={asset.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900">{asset.name}</h3>
          <p className="text-sm text-gray-500">{asset.size} • {asset.platform}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={asset.file}
            download
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            title="Copy path"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MediaAssetsPage() {
  const profiles = assets.filter(a => a.category === 'profile');
  const banners = assets.filter(a => a.category === 'banner');
  const icons = assets.filter(a => a.category === 'icon');

  const handleDownloadAll = () => {
    assets.forEach((asset, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = asset.file;
        link.download = asset.file.split('/').pop() || 'download';
        link.click();
      }, index * 300);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Siggly Media Assets
              </h1>
              <p className="text-lg text-gray-600">
                All brand assets, profile images, and banners in one place
              </p>
            </div>
            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg hover:from-violet-700 hover:to-blue-700 transition-all shadow-lg shadow-violet-500/25 font-semibold"
            >
              <Download className="h-5 w-5" />
              Download All
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-4 border border-violet-200">
              <div className="text-3xl font-bold text-violet-600">{profiles.length}</div>
              <div className="text-sm text-violet-700 font-medium">Profile Images</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">{banners.length}</div>
              <div className="text-sm text-blue-700 font-medium">Banners</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 border border-cyan-200">
              <div className="text-3xl font-bold text-cyan-600">{icons.length}</div>
              <div className="text-sm text-cyan-700 font-medium">Icons & Logos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Profile Images */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Profile Images
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </section>

        {/* Banners */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Banners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </section>

        {/* Icons & Logos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Icons & Logos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {icons.map((asset) => (
              <AssetCard key={asset.file} asset={asset} />
            ))}
          </div>
        </section>

        {/* Mockups Section - Coming Soon */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Product Mockups
          </h2>
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 border-2 border-dashed border-violet-200 rounded-xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Product Screenshots Coming Soon
              </h3>
              <p className="text-gray-600">
                High-quality mockups and screenshots from the homepage will be available here for download.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
