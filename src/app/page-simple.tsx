export default function AlysBeachSimple() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl alys-nav-text text-gray-900">
              ALYS BEACH
            </h1>
            <div className="flex space-x-4">
              <button className="bg-gray-900 text-white px-4 py-2 alys-nav-text text-xs">
                REAL ESTATE LISTINGS
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 alys-nav-text text-xs">
                BOOK YOUR STAY
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-200 flex items-center justify-center">
        <div className="text-center text-gray-900 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl alys-heading-primary mb-6">
            REAL ESTATE
          </h1>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-6xl alys-heading-primary mb-12">
            THE BEAUTY OF HOME
          </h2>
          <p className="text-lg md:text-xl alys-body-text max-w-3xl mx-auto mb-12">
            To build a life at Alys Beach is to join a community designed for joy, beauty, and life abundant.
          </p>
        </div>
      </section>

      {/* Simple Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl alys-heading-primary mb-4">
              WHY ALYS
            </h2>
            <div className="w-16 h-px bg-gray-400 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-xl alys-heading-secondary mb-4">Architectural Excellence</h3>
                <p className="text-gray-600 alys-body-text">Every home meets the prestigious Fortified for safer living® standard</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl alys-heading-secondary mb-4">Exclusive Community</h3>
                <p className="text-gray-600 alys-body-text">Join a thoughtfully designed community focused on beauty and connection</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl alys-heading-secondary mb-4">Coastal Lifestyle</h3>
                <p className="text-gray-600 alys-body-text">Experience unparalleled beach living with world-class amenities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}