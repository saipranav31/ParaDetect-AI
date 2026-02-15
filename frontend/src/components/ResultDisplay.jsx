export default function ResultDisplay({ result, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-3 border-4 border-purple-600 rounded-full border-t-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-2">Analyzing image...</p>
          <p className="text-sm text-gray-500">Our AI is processing your blood smear</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-6xl opacity-50">🔍</span>
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-2">Ready to analyze</p>
          <p className="text-sm text-gray-500">Upload an image to see results</p>
        </div>
      </div>
    )
  }

  const isInfected = result.prediction === 'Parasitized'
  const confidence = (result.confidence * 100).toFixed(2)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <div
        className={`p-8 rounded-2xl border-2 shadow-xl transform transition-all duration-500 hover:scale-105 ${
          isInfected
            ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300'
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
        }`}
      >
        <div className="text-center">
          <div className="text-7xl mb-4 animate-bounce-slow">
            {isInfected ? '⚠️' : '✅'}
          </div>
          <h3 className={`text-3xl font-bold mb-3 ${isInfected ? 'text-red-700' : 'text-green-700'}`}>
            {isInfected ? 'Parasitized' : 'Uninfected'}
          </h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-60 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              Confidence: {confidence}%
            </span>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
          <span>Confidence Level</span>
          <span className={isInfected ? 'text-red-600' : 'text-green-600'}>{confidence}%</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ease-out ${
              isInfected 
                ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            } shadow-lg`}
            style={{ width: `${confidence}%` }}
          >
            <div className="h-full w-full bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Probabilities */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Class Probabilities
        </h4>
        
        <div className="space-y-3">
          <div className="group">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <span className="font-semibold text-gray-800">Parasitized</span>
              </div>
              <span className="text-lg font-bold text-red-700">
                {(result.probabilities.Parasitized * 100).toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${(result.probabilities.Parasitized * 100).toFixed(2)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="group">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">✅</span>
                </div>
                <span className="font-semibold text-gray-800">Uninfected</span>
              </div>
              <span className="text-lg font-bold text-green-700">
                {(result.probabilities.Uninfected * 100).toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                style={{ width: `${(result.probabilities.Uninfected * 100).toFixed(2)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-xl shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-yellow-900 mb-1">Medical Disclaimer</p>
            <p className="text-xs text-yellow-800 leading-relaxed">
              This is an AI-assisted diagnostic tool for research and educational purposes. 
              Results should always be verified by qualified medical professionals before making any medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
