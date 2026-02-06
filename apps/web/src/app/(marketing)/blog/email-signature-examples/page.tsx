import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '25 Professional Email Signature Examples for 2026 | Siggly',
  description: 'Get inspired by these 25 professional email signature examples. See what works for different industries, roles, and company sizes.',
  keywords: ['email signature examples', 'professional email signature', 'email signature design', 'business email signature examples'],
};

export default function BlogPost() {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to blog
        </Link>

        <div className="mb-8">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Design</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">25 Professional Email Signature Examples for 2026</h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> February 3, 2026</span>
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 12 min read</span>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=600&fit=crop"
          alt="Professional email signature designs"
          width={1200}
          height={600}
          className="rounded-2xl mb-12"
        />

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            A well-designed email signature makes a lasting impression. Whether you're a solo 
            entrepreneur or part of a Fortune 500 company, your signature represents your 
            professional identity. Here are 25 examples to inspire your next signature redesign.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Minimalist Signatures</h2>
          <p className="text-gray-600 mb-6">
            Less is often more with email signatures. These clean designs focus on essential 
            information without visual clutter.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">1. The Classic Professional</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 font-mono text-sm">
            <p className="font-bold">Sarah Chen</p>
            <p>Senior Product Manager</p>
            <p>Acme Corporation</p>
            <p className="text-violet-600">sarah@acme.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <p className="text-gray-600 mb-6">
            Simple, clean, and effective. This format works for any industry and never looks dated.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">2. The One-Liner</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 font-mono text-sm">
            <p><strong>James Wilson</strong> · Marketing Director · Startup Inc · <span className="text-violet-600">james@startup.io</span></p>
          </div>
          <p className="text-gray-600 mb-6">
            Perfect for email threads where space is at a premium. Uses dividers to separate information 
            while keeping everything on one line.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">3. The Contact Card</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 font-mono text-sm">
            <p className="font-bold text-lg">Maria Garcia</p>
            <p className="text-gray-500 text-sm">Founder & CEO</p>
            <p className="mt-2">📧 maria@company.com</p>
            <p>📱 (555) 987-6543</p>
            <p>🌐 www.company.com</p>
          </div>
          <p className="text-gray-600 mb-6">
            Emojis add visual interest while maintaining scannability. Works well for creative industries 
            and startups.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
            alt="Modern workspace design"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Corporate Signatures</h2>
          <p className="text-gray-600 mb-6">
            Enterprise-level signatures balance professionalism with brand consistency.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">4. The Enterprise Standard</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold text-violet-800">GLOBAL CORP</p>
            <p className="font-semibold mt-2">Michael Thompson</p>
            <p>Vice President, Business Development</p>
            <p className="mt-2">Office: +1 (555) 100-2000 ext. 4521</p>
            <p>Mobile: +1 (555) 100-2001</p>
            <p className="text-violet-600">mthompson@globalcorp.com</p>
            <p className="text-xs text-gray-500 mt-4 border-t pt-4">
              This email and any attachments are confidential and may be privileged...
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            Includes legal disclaimer, which is required in many industries. Company name leads 
            to reinforce brand recognition.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">5. The Logo-Forward Design</h3>
          <p className="text-gray-600 mb-6">
            Places the company logo prominently alongside contact information. Works best when 
            the logo is recognizable and well-designed. Keep the logo height under 50 pixels 
            to maintain balance.
          </p>

          <div className="bg-violet-50 border-l-4 border-violet-500 p-6 my-8">
            <p className="text-violet-900 font-medium">
              Corporate signature tip: Maintain consistency across your organization by using 
              standardized templates. This builds brand recognition and looks more professional 
              than having every employee design their own.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Creative Industry Signatures</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">6. The Designer's Signature</h3>
          <p className="text-gray-600 mb-6">
            Creative professionals can showcase their aesthetic sensibility through signature 
            design. Consider using a custom font for your name, incorporating subtle color 
            gradients, or adding a small portfolio thumbnail.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">7. The Portfolio Link</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Alex Rivera</p>
            <p>UX Designer</p>
            <p className="mt-2 text-violet-600">View my work → portfolio.alexrivera.design</p>
            <p>Let's connect → <span className="text-violet-600">LinkedIn</span> · <span className="text-violet-600">Dribbble</span> · <span className="text-violet-600">Twitter</span></p>
          </div>
          <p className="text-gray-600 mb-6">
            Leads with the portfolio link — the most important element for a designer looking 
            for new opportunities or clients.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Sales & Business Development Signatures</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">8. The Booking Link Signature</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Jennifer Park</p>
            <p>Account Executive · SaaS Company</p>
            <p className="mt-2">📱 (555) 234-5678</p>
            <p className="mt-3 p-2 bg-violet-100 rounded text-center">
              <span className="text-violet-700 font-medium">📅 Schedule a call with me</span>
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            The prominent booking link removes friction from scheduling meetings. Services like 
            Calendly or HubSpot Meetings work well here.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">9. The Social Proof Signature</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">David Kim</p>
            <p>Enterprise Sales · TechCo</p>
            <p className="mt-2">david@techco.com · (555) 345-6789</p>
            <p className="mt-3 text-xs text-gray-500">⭐ Rated 4.9/5 on G2 · Trusted by 10,000+ companies</p>
          </div>
          <p className="text-gray-600 mb-6">
            Including social proof elements like ratings or customer counts builds credibility 
            without being overtly promotional.
          </p>

          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
            alt="Team collaboration meeting"
            width={800}
            height={400}
            className="rounded-xl my-8"
          />

          <h2 className="text-2xl font-bold mt-12 mb-4">Industry-Specific Signatures</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">10. Legal Professional</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Robert Martinez, Esq.</p>
            <p>Partner · Corporate Law</p>
            <p>Martinez & Associates LLP</p>
            <p className="mt-2">Office: (555) 456-7890</p>
            <p>Fax: (555) 456-7891</p>
            <p className="text-violet-600">rmartinez@martinezlaw.com</p>
            <p className="text-xs text-gray-500 mt-4 border-t pt-4">
              CONFIDENTIALITY NOTICE: This email contains privileged attorney-client 
              communication...
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">11. Healthcare Professional</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Dr. Emily Watson, MD, FACP</p>
            <p>Internal Medicine</p>
            <p>City Medical Center</p>
            <p className="mt-2">Patient Appointments: (555) 567-8901</p>
            <p className="text-xs text-gray-500 mt-4 border-t pt-4">
              This message may contain protected health information (PHI) subject to HIPAA...
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-3">12. Real Estate Agent</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Lisa Chen, REALTOR®</p>
            <p>Luxury Home Specialist</p>
            <p>Coldwell Banker · DRE #01234567</p>
            <p className="mt-2">📱 (555) 678-9012</p>
            <p className="text-violet-600">lisa@lisachenhomes.com</p>
            <p className="text-violet-600">www.lisachenhomes.com</p>
          </div>
          <p className="text-gray-600 mb-6">
            Real estate agents must include their license number in many states. The REALTOR® 
            trademark should also be properly formatted.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">13. Financial Advisor</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Thomas Wright, CFP®, CFA</p>
            <p>Senior Financial Advisor</p>
            <p>Wealth Management Partners</p>
            <p>CRD# 1234567</p>
            <p className="mt-2">(555) 789-0123 · twright@wealthmp.com</p>
            <p className="text-xs text-gray-500 mt-4 border-t pt-4">
              Securities offered through Example Broker-Dealer, Member FINRA/SIPC...
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Signatures with Marketing Elements</h2>

          <h3 className="text-xl font-semibold mt-8 mb-3">14. The Banner Signature</h3>
          <p className="text-gray-600 mb-6">
            Add a promotional banner below your contact information to highlight events, 
            product launches, or special offers. Keep banners under 600 pixels wide and 
            link them to relevant landing pages.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-3">15. The Award Winner</h3>
          <div className="bg-gray-50 p-6 rounded-xl my-6 text-sm">
            <p className="font-bold">Amanda Foster</p>
            <p>CEO · Innovation Labs</p>
            <p className="mt-2">amanda@innovationlabs.io</p>
            <p className="text-xs mt-3">🏆 Inc. 5000 Fastest-Growing Company 2025</p>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
            <li>Match your signature style to your industry and role</li>
            <li>Include only essential information — don't overwhelm recipients</li>
            <li>Ensure your signature is mobile-responsive</li>
            <li>Test your signature across different email clients</li>
            <li>Update your signature when your role or contact info changes</li>
            <li>Consider <Link href="/features" className="text-violet-600 hover:underline">using templates</Link> for consistency across your organization</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 my-12">
            <h3 className="text-xl font-bold mb-4">Create professional signatures for your team</h3>
            <p className="text-gray-600 mb-6">
              Siggly makes it easy to design, deploy, and manage consistent email signatures 
              across your entire organization.
            </p>
            <Link href="/signup">
              <Button>Try Free Signature Templates <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
