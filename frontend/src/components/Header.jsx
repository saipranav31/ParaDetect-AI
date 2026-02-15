export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ParaDetect AI
              </h1>
              <p className="text-sm text-gray-600">Deep Learning Malaria Diagnosis</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="http://localhost:8000/docs" target="_blank" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              API Docs
            </a>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm font-medium text-white">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
