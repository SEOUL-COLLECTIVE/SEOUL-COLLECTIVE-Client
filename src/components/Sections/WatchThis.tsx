'use client'

export default function WatchThis() {
  return (
    <div className="bg-scpurple py-[3.543rem] -mx-[5.375rem]">
      <div className="text-center px-[3.375rem] flex flex-col">
        <div className="font-point text-p50">WATCH THIS</div>
        <div className="font-bold text-p17 pb-10">November 2025 Monthly Hauls</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LEFT BIG VIDEO */}
          <div className="w-full">
            <div className="relative w-full aspect-[9/16] md:aspect-[4/5] overflow-hidden rounded-xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/mCgrsOulijo"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* RIGHT 2x2 GRID */}
          <div className="grid grid-cols-2 gap-4">
            {['XUESSMOgsps', 'r4b1ZL39i0Y', '-l6UN1Dt4ls', 'l6UN1Dt4ls'].map((id, index) => (
              <div key={index} className="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Shorts ${index}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
