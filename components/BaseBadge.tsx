export function BaseBadge() {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
      <img 
        src="/base-logo.svg" 
        alt="Base" 
        className="w-4 h-4 mr-1"
      />
      <span className="text-blue-600 dark:text-blue-400">
        Powered by Base
      </span>
    </div>
  );
} 