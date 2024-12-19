import PostEditor from '@/components/posts/editor/PostEditor'
import Post from '@/components/posts/Post'
import TrendsSidebar from '@/components/TrendsSidebar'
import prisma from '@/lib/prisma'
import { postDataInclude } from '@/lib/types'
import React from 'react'

const HomePage = async () => {

  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: 'desc' },
  })
  return (
    <main className='w-full mt-[6px] flex gap-5 h-fit'>
      <div className='w-full space-y-5 '>
        <PostEditor />
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default HomePage