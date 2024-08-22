import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProductCard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-1">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};

export default SkeletonProductCard;