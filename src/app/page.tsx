export default function Page() {
  return (
    <div className="min-h-screen">
      <main className="space-y-8 p-8">
        <section className="text-center">
          <h1 className="mb-4 text-4xl font-bold">SEOUL COLLECTIVE</h1>
          <p className="mb-8 text-lg text-gray-600">
            Scroll down to see the topbar behavior change
          </p>
        </section>

        <section className="rounded-lg bg-gray-50 p-8">
          <h2 className="mb-4 text-2xl font-bold">SKIN CARE</h2>
          <p className="mb-4 text-gray-600">
            Discover our curated selection of skincare products from Korea's top brands.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded bg-white p-4">Cleansers</div>
            <div className="rounded bg-white p-4">Moisturizers</div>
            <div className="rounded bg-white p-4">Serums</div>
          </div>
        </section>

        <section className="bg-purple-50 rounded-lg p-8">
          <h2 className="mb-4 text-2xl font-bold">MAKEUP</h2>
          <p className="mb-4 text-gray-600">Professional makeup products for every occasion.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded bg-white p-4">Face</div>
            <div className="rounded bg-white p-4">Eyes</div>
            <div className="rounded bg-white p-4">Lips</div>
            <div className="rounded bg-white p-4">Tools</div>
          </div>
        </section>

        <section className="rounded-lg bg-pink-50 p-8">
          <h2 className="mb-4 text-2xl font-bold">HAIR CARE</h2>
          <p className="mb-4 text-gray-600">
            Keep scrolling to see the topbar disappear when you scroll down past 50px.
          </p>
          <div className="space-y-4">
            <div className="rounded bg-white p-4">Shampoo & Conditioner</div>
            <div className="rounded bg-white p-4">Styling Products</div>
            <div className="rounded bg-white p-4">Hair Treatments</div>
          </div>
        </section>

        <section className="rounded-lg bg-blue-50 p-8">
          <h2 className="mb-4 text-2xl font-bold">COMMUNITY</h2>
          <p className="mb-4 text-gray-600">Join our community and share your beauty journey.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded bg-white p-4">Product Reviews</div>
            <div className="rounded bg-white p-4">Beauty Tips</div>
          </div>
        </section>

        <div className="flex h-96 items-center justify-center rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
          <p className="text-center text-gray-600">
            Scroll back up to see the topbar reappear!
            <br />
            The navbar should remain visible while the top section hides.
          </p>
        </div>
      </main>
    </div>
  )
}
