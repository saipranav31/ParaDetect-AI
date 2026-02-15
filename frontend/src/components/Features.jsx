export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Detection',
      description: 'Advanced deep learning model trained on 27,558 blood smear images',
      color: 'bg-blue-500'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get accurate results in less than 1 second with real-time processing',
      color: 'bg-yellow-500'
    },
    {
      icon: '🎯',
      title: 'Accurate',
      description: 'Validated on extensive dataset with high validation accuracy',
      color: 'bg-green-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your images are processed locally and never stored on our servers',
      color: 'bg-purple-500'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Works seamlessly on desktop, tablet, and mobile devices',
      color: 'bg-indigo-500'
    },
    {
      icon: '📊',
      title: 'Detailed Analytics',
      description: 'Comprehensive confidence scores and probability breakdowns',
      color: 'bg-pink-500'
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose ParaDetect AI?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cutting-edge technology meets medical precision for reliable malaria detection
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-3xl">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="mt-16 bg-blue-600 rounded-xl p-8 md:p-12 text-white shadow-lg">
        <h3 className="text-3xl font-bold mb-8 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Upload Image</h4>
            <p className="text-blue-100">Upload a blood smear microscopy image</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">AI Analysis</h4>
            <p className="text-blue-100">Our AI model analyzes the image instantly</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Get Results</h4>
            <p className="text-blue-100">Receive detailed diagnosis with confidence scores</p>
          </div>
        </div>
      </div>
    </section>
  )
}
