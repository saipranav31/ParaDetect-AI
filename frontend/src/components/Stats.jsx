export default function Stats({ analysisCount }) {
  const stats = [
    { 
      label: 'Model Accuracy', 
      value: '100%', 
      icon: '🎯', 
      color: 'bg-green-500'
    },
    { 
      label: 'Analyses Performed', 
      value: analysisCount.toLocaleString(), 
      icon: '📊', 
      color: 'bg-blue-500'
    },
    { 
      label: 'Response Time', 
      value: '<1s', 
      icon: '⚡', 
      color: 'bg-yellow-500'
    },
    { 
      label: 'Dataset Size', 
      value: '27K+', 
      icon: '🗂️', 
      color: 'bg-purple-500'
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-gray-200"
        >
          <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
