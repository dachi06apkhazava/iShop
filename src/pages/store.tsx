"use client"

import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Filter, Grid3X3, List, Search, X } from "lucide-react"


interface Product {
  id: number
  category: string
  name: string
  chip: string
  colors: string[]
  capacity: string[]
  ram: string
  screenSize: string
  price: number
  image: string
}

function Store() {
  const { category } = useParams<{ category: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [animationClass, setAnimationClass] = useState("translate-x-full")
  const [isClosing, setIsClosing] = useState(false)

  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])
  const openMobileFilters = () => {
  setShowMobileFilters(true)
  setTimeout(() => setAnimationClass("translate-x-0"), 10)
 }


 const closeMobileFilters = () => {
 setIsClosing(true)
 setTimeout(() => {
    setShowMobileFilters(false)
    setIsClosing(false)
 }, 300)
}


  const filteredByCategory = useMemo(() => {
    if (category === "all") return products
    return products.filter((product) => product.category === category)
  }, [products, category])

  const uniqueCapacities = useMemo(() => {
    const capacities = new Set<string>()
    filteredByCategory.forEach((product) => product.capacity.forEach((cap) => capacities.add(cap)))
    return Array.from(capacities).sort()
  }, [filteredByCategory])

  const uniqueColors = useMemo(() => {
    const colors = new Set<string>()
    filteredByCategory.forEach((product) => product.colors.forEach((color) => colors.add(color)))
    return Array.from(colors).sort()
  }, [filteredByCategory])

  const uniqueModels = useMemo(() => {
    const models = new Set<string>()
    filteredByCategory.forEach((product) => models.add(product.name))
    return Array.from(models).sort()
  }, [filteredByCategory])

  useEffect(() => {
    let filtered = [...filteredByCategory]

    if (selectedCapacities.length > 0) {
      filtered = filtered.filter((product) =>
        product.capacity.some((cap) => selectedCapacities.includes(cap))
      )
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      )
    }

    if (selectedModels.length > 0) {
      filtered = filtered.filter((product) => selectedModels.includes(product.name))
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        filtered.sort((a, b) => b.id - a.id)
    }

    setFilteredProducts(filtered)
  }, [filteredByCategory, selectedCapacities, selectedColors, selectedModels, priceRange, sortBy])

  const toggleFilter = (selected: string[], setSelected: Function, value: string) => {
    setSelected(selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value])
  }

  const clearAllFilters = () => {
    setSelectedCapacities([])
    setSelectedColors([])
    setSelectedModels([])
    setPriceRange([0, 2000])
  }

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Models</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniqueModels.map((model) => (
            <label key={model} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={() => toggleFilter(selectedModels, setSelectedModels, model)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{model}</span>
            </label>
          ))}
        </div>
      </div>

      {uniqueCapacities.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Capacity</h3>
          <div className="space-y-2">
            {uniqueCapacities.map((cap) => (
              <label key={cap} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(cap)}
                  onChange={() => toggleFilter(selectedCapacities, setSelectedCapacities, cap)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{cap}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Color</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniqueColors.map((color) => (
            <label key={color} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedCapacities.length > 0 || selectedColors.length > 0 || selectedModels.length > 0) && (
        <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800">
          Clear all filters
        </button>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 capitalize mb-4">{category}</h1>
          <nav className="text-sm text-gray-500 mb-6">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="capitalize">{category}</span>
          </nav>

          <div className="hidden lg:flex flex-wrap gap-2 mb-4">
            {uniqueModels.slice(0, 6).map((model) => (
              <button
                key={model}
                onClick={() => toggleFilter(selectedModels, setSelectedModels, model)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedModels.includes(model)
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                }`}
              >
                {model}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 hidden sm:block">Show: {filteredProducts.length}</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
              <FilterSection />
            </div>
          </div>

          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
                {/* Blurry dark background */}
                <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={closeMobileFilters}
                />

                {/* Sliding panel */}
                <div
                className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 transform ${
                    isClosing ? "-translate-x-full" : "translate-x-0"
                }`}
                >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button
                    onClick={closeMobileFilters}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                    <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto h-full pb-20">
                    <FilterSection />
                </div>
                </div>
            </div>
            )}


          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === "list" ? "flex" : ""}`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">In Stock</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.chip}</p>
                      <div className="space-y-2 mb-4 text-sm text-gray-700">
                        <div className="flex justify-between"><span>Screen:</span><span>{product.screenSize}</span></div>
                        <div className="flex justify-between"><span>RAM:</span><span>{product.ram}</span></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
