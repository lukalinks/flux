const onboardingSteps = [
  {
    step: 1,
    title: "Connect Wallet",
    description: "Quick and secure wallet setup",
    icon: "👛",
    action: "Connect Now",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    step: 2,
    title: "Swap Tokens",
    description: "Trade any token instantly",
    icon: "💱",
    action: "Start Trading",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    step: 3,
    title: "Explore More",
    description: "Discover DeFi opportunities",
    icon: "🚀",
    action: "Explore",
    gradient: "from-pink-500 to-orange-500"
  }
];

export function OnboardingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Start Trading in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to begin your trading journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {onboardingSteps.map((step, index) => (
            <div key={index} className="relative group">
              {index < onboardingSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent 
                              dark:via-gray-700 transform translate-y-[-50%]" />
              )}
              <div className="relative z-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl 
                            transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700
                            backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
                <div className="text-4xl mb-6 p-4 rounded-xl bg-gradient-to-r w-fit {step.gradient}
                              text-white shadow-lg">{step.icon}</div>
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r {step.gradient}
                              text-white mb-4">Step {step.step}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>
                <button className="w-full py-3 px-6 rounded-xl font-medium text-white 
                                 bg-gradient-to-r {step.gradient} hover:opacity-90
                                 transform transition-all duration-300 hover:scale-[1.02]
                                 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  {step.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 