"use client";

const skeletonRows = [1, 2, 3, 4];

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-[#E9ECF1] ${className}`} />;
}

export default function JobTabSkeleton() {
  return (
    <div
      className="max-w-282 mx-auto px-4 py-6 grid gap-5
                 grid-cols-[225px_1fr_300px]
                 max-[1024px]:grid-cols-[200px_1fr]
                 max-[768px]:grid-cols-1"
    >
      <div className="max-[768px]:hidden flex flex-col gap-2.5">
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden p-4">
          <SkeletonBlock className="h-14 rounded-t-[10px] rounded-b-none mb-4" />
          <div className="flex items-start gap-3">
            <SkeletonBlock className="w-15 h-15 rounded-full -mt-9 border-[3px] border-white bg-[#DDE3EA]" />
            <div className="flex-1 pt-1 space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-3.5 w-32" />
              <SkeletonBlock className="h-3.5 w-20" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <SkeletonBlock className="h-3.5 w-full" />
            <SkeletonBlock className="h-3.5 w-[86%]" />
            <SkeletonBlock className="h-3.5 w-[72%]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <SkeletonBlock className="h-8 w-28 rounded-full" />
            <SkeletonBlock className="h-8 w-24 rounded-full" />
            <SkeletonBlock className="h-8 w-32 rounded-full" />
            <SkeletonBlock className="h-8 w-20 rounded-full" />
          </div>
          <SkeletonBlock className="h-11 w-full rounded-[16px]" />
          <div className="grid gap-3 sm:grid-cols-2">
            <SkeletonBlock className="h-24 rounded-[14px]" />
            <SkeletonBlock className="h-24 rounded-[14px]" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
          <div className="px-4 pt-3.5 pb-2.5 space-y-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-3.5 w-48" />
          </div>

          {skeletonRows.map((row) => (
            <div
              key={row}
              className="flex items-center gap-3 px-4 py-3 border-t border-[#E4E4E7]"
            >
              <SkeletonBlock className="w-10 h-10 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-[62%]" />
                <SkeletonBlock className="h-3.5 w-[42%]" />
                <SkeletonBlock className="h-3.5 w-[34%]" />
              </div>
              <SkeletonBlock className="h-8 w-20 rounded-2xl shrink-0" />
            </div>
          ))}

          <div className="px-4 py-3 border-t border-[#E4E4E7]">
            <SkeletonBlock className="h-3.5 w-28 mx-auto" />
          </div>
        </div>
      </div>

      <div className="max-[1024px]:hidden flex flex-col gap-2.5">
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden p-4 space-y-3">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-16 w-full rounded-[14px]" />
          <SkeletonBlock className="h-16 w-full rounded-[14px]" />
          <SkeletonBlock className="h-9 w-28 mx-auto rounded-full" />
        </div>

        <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden p-4 space-y-3">
          <SkeletonBlock className="h-4 w-36" />
          <SkeletonBlock className="h-20 w-full rounded-[14px]" />
          <SkeletonBlock className="h-20 w-full rounded-[14px]" />
        </div>

        <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden p-4 space-y-3">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-3.5 w-48" />
          <SkeletonBlock className="h-3.5 w-44" />
          <SkeletonBlock className="h-3.5 w-40" />
        </div>
      </div>
    </div>
  );
}