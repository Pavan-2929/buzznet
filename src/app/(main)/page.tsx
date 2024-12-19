import PostEditor from '@/components/posts/editor/PostEditor'
import Post from '@/components/posts/Post'
import prisma from '@/lib/prisma'
import { postDataInclude } from '@/lib/types'
import React from 'react'
import ForYouFeed from './ForYouFeed'
import TrendsSidebar from '@/components/Sidebar/TrendsSidebar'

const HomePage = () => {

  return (
    <main className='w-full mt-[6px] flex gap-5 h-fit'>
      <div className='w-full space-y-5 '>
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default HomePage