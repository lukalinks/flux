const featuresList = [
  {
    icon: "💱",
    title: "Easy Token Trading",
    description: "Swap tokens in just a few clicks",
    details: [
      "Simple swap interface",
      "Best price routing",
      "Popular token pairs",
      "Low fees"
    ]
  },
  {
    icon: "🛡️",
    title: "Safe & Secure",
    description: "Trade with peace of mind",
    details: [
      "Transaction previews",
      "Scam protection",
      "Clear confirmations",
      "Secure wallet connection"
    ]
  },
  {
    icon: "🌐",
    title: "Web3 Made Easy",
    description: "Join the future of finance",
    details: [
      "DeFi participation",
      "NFT marketplace",
      "Staking options",
      "Yield opportunities"
    ]
  }
];

export function FeaturesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Simple. Fast. Secure.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to trade tokens and explore Web3
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
                         border border-gray-100 dark:border-gray-800 
                         hover:border-blue-500/50 hover:translate-y-[-8px]
                         transition-all duration-300 
                         hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="text-5xl mb-6 transform hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{feature.description}</p>
              <ul className="space-y-4">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-sm group">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 