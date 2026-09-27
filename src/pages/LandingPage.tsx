import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Sparkles, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassBackdrop } from '@/components/ui/GlassBackdrop';
import { GlassCard } from '@/components/ui/GlassCard';
import { Brand } from '@/components/ui/Brand';

export function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <GlassBackdrop variant="landing" />

      <header className="relative p-6 sm:p-8 flex items-center justify-between">
        <Brand />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm"><Link to="/signup">Get started</Link></Button>
        </div>
      </header>

      <main className="relative">
        {/* Hero */}
        <section className="px-6 pt-12 pb-20 sm:pt-20 sm:pb-28">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Built in India, for India
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.02] text-gradient">
              Stop overpaying<br />for your medicines.
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto leading-relaxed">
              Snap a photo of any medicine strip. We tell you the generic name and how
              much the same medicine costs without the brand markup.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="xl">
                <Link to="/signup">
                  Scan your first medicine
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#how">See how it works</a>
              </Button>
            </div>

            <p className="text-xs text-white/30 pt-2">Free forever · No credit card</p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="px-6 py-20 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                How it works
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold text-gradient">
                Three taps. That's it.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Camera, title: 'Snap a photo', body: 'Point your camera at any medicine strip. No typing.' },
                { icon: Sparkles, title: 'We read it', body: 'AI identifies the brand and looks up its actual salt composition.' },
                { icon: TrendingDown, title: 'See the savings', body: 'We show the generic name and every cheaper equivalent.' },
              ].map((step, i) => (
                <GlassCard key={step.title} className="p-6 text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-400/10 text-emerald-400 shadow-[0_0_24px_-6px_rgba(52,211,153,0.4)] relative mb-5">
                    <step.icon className="h-6 w-6" />
                    <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">{step.body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <GlassCard intensity="strong" className="max-w-3xl mx-auto p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gradient">
                Your next strip is cheaper than you think.
              </h2>
              <p className="mt-4 text-white/50 max-w-md mx-auto">
                Free to use. No credit card. Scan your first medicine in under a minute.
              </p>
              <Button asChild size="xl" className="mt-8">
                <Link to="/signup">
                  Create a free account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </section>
      </main>

      <footer className="relative border-t border-white/[0.06] py-8 px-6 text-center">
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} MediScan · Built in India · Informational only, not medical advice
        </p>
      </footer>
    </div>
  );
}