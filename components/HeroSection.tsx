import { SwapInterface } from './SwapInterface';

export function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Restored to original */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-sm text-gray-300">Live Trading Platform</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block text-white">Next Generation</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Token Trading Platform
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-xl">
              Experience seamless token trading with institutional-grade security and lightning-fast execution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Start Trading Now
              </button>
              <button className="px-8 py-4 rounded-lg border border-gray-700 hover:border-blue-500 text-white backdrop-blur-sm transition-all duration-300">
                View Documentation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-gray-800">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">★★★★★</span>
                  <span className="text-gray-400">4.9/5 Rating</span>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800"></div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-blue-600 flex items-center justify-center text-xs text-white">
                    +2k
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Swap Interface */}
          <div className="relative">
            <SwapInterface />
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}