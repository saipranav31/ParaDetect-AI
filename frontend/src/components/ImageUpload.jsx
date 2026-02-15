import { useRef } from 'react'

export default function ImageUpload({ onFileSelect, preview, loading }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <div
        onClick={() => !loading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative border-4 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-500 card-interactive ${
          preview
            ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-100'
            : 'border-white border-opacity-50 bg-white bg-opacity-10 hover:border-cyan-400 hover:bg-opacity-20'
        } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-500/50'} group backdrop-blur-sm`}
      >
        {preview ? (
          <div className="space-y-4 animate-scale-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse-glow"></div>
              <img
                src={preview}
                alt="Preview"
                className="relative max-h-80 mx-auto rounded-2xl shadow-2xl ring-4 ring-white ring-opacity-50 group-hover:ring-cyan-400 transition-all transform group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-white font-bold text-lg drop-shadow-lg">
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Click to change image
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-50 animate-pulse-glow"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl animate-float">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce border-4 border-white">
                <span className="text-white text-2xl font-black">+</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-black text-white mb-3 drop-shadow-lg">
                Drop your blood smear image here
              </p>
              <p className="text-lg text-white font-semibold opacity-90">
                or click to browse • Supports PNG, JPG, JPEG
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-white font-bold pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Fast Upload
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Secure
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Private
              </div>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />
    </div>
  )
}
