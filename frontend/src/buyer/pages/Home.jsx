import AssetCard from "../components/AssetCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Explore() {
  const assets = [
    { id: 1, url: "/asset1.jpeg", title: "Asset One" },
    { id: 2, url: "/asset2.jpeg", title: "Asset Two" },
    { id: 3, url: "/asset3.jpeg", title: "Asset Two" },
    { id: 4, url: "/asset4.jpeg", title: "Asset Two" },
    { id: 5, url: "/assets5.jpeg", title: "Asset Two" },
    { id: 6, url: "/assets6.jpeg", title: "Asset Two" },
    { id: 7, url: "/asset1.jpeg", title: "Asset Two" },
    { id: 8, url: "/asset2.jpeg", title: "Asset Two" },
    { id: 9, url: "/asset3.jpeg", title: "Asset Two" },
    { id: 10, url: "/asset4.jpeg", title: "Asset Two" },
    { id: 11, url: "/assets5.jpeg", title: "Asset Two" },
    { id: 12, url: "/assets6.jpeg", title: "Asset Two" },
    { id: 13, url: "/asset1.jpeg", title: "Asset Two" },
    { id: 14, url: "/asset2.jpeg", title: "Asset Two" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-2">Explore Digital Assets</h1>
      <p className="text-gray-600 mb-8">
        Discover high-quality templates, graphics, videos, and audio assets.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <FilterSidebar className="sticky bg-red fixed" />

        {/* Assets */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {assets.map((item) => (
            <AssetCard key={item.id} imageUrl={item.url} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
