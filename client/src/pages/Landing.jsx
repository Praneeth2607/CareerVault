import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Folder, 
  Briefcase, 
  Award, 
  Bookmark, 
  Microscope, 
  FileText, 
  Shield, 
  ArrowRight,
  Sparkles,
  Search,
  Copy,
  ChevronRight
} from 'lucide-react';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary text-heading font-body selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold text-primary tracking-tight">CareerVault</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#features" className="text-heading/60 hover:text-primary transition-colors">Features</a>
          <a href="#security" className="text-heading/60 hover:text-primary transition-colors text-editorial">Security</a>
          <a href="#preview" className="text-heading/60 hover:text-primary transition-colors">Product Preview</a>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 bg-primary text-bg-primary rounded-button text-sm font-medium hover:bg-primary/95 transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2.5 text-sm font-medium hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-primary text-bg-primary rounded-button text-sm font-medium hover:bg-primary/95 transition-all shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-20 md:py-32 space-y-8">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-heading leading-tight tracking-tight max-w-3xl mx-auto">
          The minimalist vault for your career achievements.
        </h1>
        <p className="text-lg md:text-xl text-heading/70 max-w-2xl mx-auto leading-relaxed font-light">
          A secure, beautifully structured digital ledger to catalog your software projects, academic research, work history, and certificates. Designed for clarity, scanability, and speed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button 
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-bg-primary rounded-button text-base font-semibold hover:bg-primary/95 transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <span>Create your free Vault</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <a 
            href="#preview"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-heading rounded-button text-base font-semibold hover:bg-bg-secondary hover:border-primary/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Explore Mockup</span>
          </a>
        </div>
      </section>

      {/* Product Preview Mockup */}
      <section id="preview" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="border border-border rounded-xl bg-bg-secondary p-4 md:p-8 shadow-sm">
          {/* Simulated Dashboard UI */}
          <div className="border border-border rounded-lg bg-bg-primary overflow-hidden">
            {/* Mock Header */}
            <div className="border-b border-border bg-bg-secondary px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-heading/40 font-mono pl-4">career-vault-dashboard.app</span>
              </div>
              <div className="w-1/3 max-w-xs h-7 bg-bg-primary rounded-md border border-border flex items-center px-3 space-x-2 text-heading/30">
                <Search className="w-3.5 h-3.5" />
                <span className="text-xs">Search credentials...</span>
              </div>
            </div>
            {/* Mock Body */}
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[400px]">
              {/* Mock Sidebar */}
              <div className="border-r border-border bg-bg-secondary p-4 space-y-6 hidden md:block">
                <div className="text-xs font-bold font-heading text-heading/40 uppercase tracking-wider px-2">Modules</div>
                <nav className="space-y-1.5">
                  <div className="flex items-center space-x-3 px-3 py-2 bg-primary/5 text-primary rounded-md font-medium text-sm">
                    <Folder className="w-4 h-4" /> <span>Projects</span>
                  </div>
                  <div className="flex items-center space-x-3 px-3 py-2 text-heading/60 rounded-md text-sm">
                    <Briefcase className="w-4 h-4" /> <span>Experience</span>
                  </div>
                  <div className="flex items-center space-x-3 px-3 py-2 text-heading/60 rounded-md text-sm">
                    <Award className="w-4 h-4" /> <span>Skills</span>
                  </div>
                  <div className="flex items-center space-x-3 px-3 py-2 text-heading/60 rounded-md text-sm">
                    <Microscope className="w-4 h-4" /> <span>Research</span>
                  </div>
                </nav>
              </div>
              {/* Mock Main Screen */}
              <div className="col-span-3 p-6 md:p-8 space-y-8 bg-bg-primary">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-heading">Featured Projects</h3>
                    <p className="text-xs text-heading/60 mt-1">Mock preview of stored project details</p>
                  </div>
                  <span className="px-3 py-1.5 bg-primary text-bg-primary rounded-button text-xs font-medium">Add Project</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="bg-bg-secondary p-5 rounded-card border border-border space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-heading font-bold text-heading text-base">CareerVault Redesign</h4>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">PROJECT</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-heading/50 uppercase tracking-wider text-[10px]">Description</span>
                        <p className="text-heading/80 mt-0.5">Implemented premium typography and editorial grids.</p>
                      </div>
                      <div>
                        <span className="font-medium text-heading/50 uppercase tracking-wider text-[10px]">Tech Stack</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="px-1.5 py-0.5 bg-heading/5 text-heading/70 rounded text-[9px]">React</span>
                          <span className="px-1.5 py-0.5 bg-heading/5 text-heading/70 rounded text-[9px]">Tailwind</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between items-center text-[10px] text-heading/40">
                      <span>Updated: Today</span>
                      <button className="flex items-center text-primary hover:underline">
                        <Copy className="w-3 h-3 mr-1" /> Copy Markdown
                      </button>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-bg-secondary p-5 rounded-card border border-border space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-heading font-bold text-heading text-base">AI Resume Parser</h4>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">PROJECT</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium text-heading/50 uppercase tracking-wider text-[10px]">Description</span>
                        <p className="text-heading/80 mt-0.5">Microservice parsing PDF CVs into structured schema formats.</p>
                      </div>
                      <div>
                        <span className="font-medium text-heading/50 uppercase tracking-wider text-[10px]">Tech Stack</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="px-1.5 py-0.5 bg-heading/5 text-heading/70 rounded text-[9px]">Python</span>
                          <span className="px-1.5 py-0.5 bg-heading/5 text-heading/70 rounded text-[9px]">FastAPI</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between items-center text-[10px] text-heading/40">
                      <span>Updated: 2 days ago</span>
                      <button className="flex items-center text-primary hover:underline">
                        <Copy className="w-3 h-3 mr-1" /> Copy Markdown
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="bg-bg-secondary border-y border-border py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">Structured storage for every resume asset.</h2>
            <p className="text-heading/70 font-light">Stop losing accomplishments in scattered documents. Systematically log all of your credentials in dedicated, schema-validated modules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Projects & Portfolios</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Document repositories, live links, exact technology stacks, and detailed write-ups of your professional projects.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Work History Log</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Keep an exhaustive list of jobs, exact dates, bullet achievements, and manager references ready for copy-pasting.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Skills Ledger</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Catalog your languages, frameworks, developer tools, and certifications alongside your active mastery levels.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Research & Papers</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Organize academic publications, abstracts, indexing metadata, and citation references in a neat editorial format.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Resume Text Blocks</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Save variations of cover letters, personal profile bios, and summary paragraphs tailored to specific jobs.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-bg-primary p-8 rounded-card border border-border space-y-4 hover:border-primary/30 transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-heading">Honors & Certs</h3>
              <p className="text-sm text-heading/70 leading-relaxed font-light">
                Record awards, scholarship details, and online certifications with quick copy URLs and verification IDs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Focus Section */}
      <section id="security" className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-semantic-info/10 rounded-full text-xs font-semibold text-semantic-info tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Bank-Grade Encryption</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-heading leading-tight tracking-tight">
            Your professional data. Completely secure.
          </h2>
          <p className="text-base text-heading/70 leading-relaxed font-light">
            CareerVault was built for professionals who value data privacy and session integrity. Our system prevents data leakage, logs all active sessions, and offers quick verification methods to secure your professional ledger.
          </p>
          <div className="space-y-4 pt-2">
            <div className="flex items-start">
              <ChevronRight className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" />
              <p className="text-sm text-heading/80"><strong className="font-semibold">Session Auditing:</strong> View active devices, IP addresses, and revoke any session remotely.</p>
            </div>
            <div className="flex items-start">
              <ChevronRight className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" />
              <p className="text-sm text-heading/80"><strong className="font-semibold">JWT Bearer Security:</strong> Fully isolated network endpoints using cryptographically signed access tokens.</p>
            </div>
            <div className="flex items-start">
              <ChevronRight className="w-5 h-5 text-secondary mr-2 shrink-0 mt-0.5" />
              <p className="text-sm text-heading/80"><strong className="font-semibold">Zero Advertising:</strong> No data selling. You have complete ownership of all inputs in your vault.</p>
            </div>
          </div>
        </div>
        <div className="border border-border bg-bg-secondary p-8 rounded-card relative overflow-hidden flex flex-col space-y-6">
          <h3 className="font-heading font-bold text-heading text-lg">Active Sessions Auditor Mock</h3>
          <div className="space-y-3">
            <div className="p-4 bg-bg-primary rounded-lg border border-border flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-heading">Apple MacBook Pro 14"</p>
                <p className="text-[10px] text-heading/50">IP: 198.162.1.4 • Chrome (macOS)</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-semantic-success text-white rounded-full font-medium">Current</span>
            </div>
            <div className="p-4 bg-bg-primary rounded-lg border border-border flex items-center justify-between opacity-60">
              <div>
                <p className="text-xs font-semibold text-heading">Linux Workstation</p>
                <p className="text-[10px] text-heading/50">IP: 84.120.33.15 • Firefox (Ubuntu)</p>
              </div>
              <span className="text-[10px] text-semantic-error hover:underline cursor-pointer font-medium">Revoke</span>
            </div>
          </div>
          <p className="text-[11px] text-heading/50 text-center">Manage devices under your settings pane in real-time.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-bg-primary py-20 px-6 text-center border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white">
            Take command of your accomplishments.
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Consolidate your career assets into a sleek, editorial-standard environment. Always have the exact metrics, tools, and summaries ready when opportunities arrive.
          </p>
          <button 
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="px-8 py-4 bg-bg-primary text-primary rounded-button text-base font-semibold hover:bg-[#F3EEE7] transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>Start Building Your Vault</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-border text-sm text-heading/50">
        <div>
          <p>© {new Date().getFullYear()} CareerVault. Crafted for professionals.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 font-medium">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#security" className="hover:text-primary transition-colors">Security</a>
          <Link to="/login" className="hover:text-primary transition-colors">Sign In</Link>
          <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
        </div>
      </footer>
    </div>
  );
}
