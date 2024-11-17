export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90" />
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center leading-tight">
            Ready to Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Trading?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
            Join thousands of traders making easy swaps every day
          </p>

          <button className="group relative px-8 py-4 rounded-2xl bg-white font-semibold text-blue-600 hover:bg-opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="relative z-10">Trade Now</span>
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
} 