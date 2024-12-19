import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PostsSkeletonLoader = () => {
  return (
    <div className='space-y-2'>
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
    </div>
  )
}

const PostSkeletonLoader = () => {
  return (
    <div className="space-y-3 rounded-2xl bg-card p-5 shadow-md animate-pulse">
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className='size-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24 rounded' />
          <Skeleton className='h-4 w-20 rounded' />
        </div>
      </div>
      <Skeleton className='h-24 rounded' />
    </div>
  )
}

export default PostsSkeletonLoader