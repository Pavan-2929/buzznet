import PostEditor from '@/components/posts/editor/PostEditor'
import React from 'react'
import ForYouFeed from './ForYouFeed'
import TrendsSidebar from '@/components/Sidebar/TrendsSidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FollowingFeed from './FollowingFeed'

const HomePage = () => {

  return (
    <main className='w-full mt-[6px] flex gap-5 h-fit'>
      <div className='w-full space-y-5 '>
        <PostEditor />
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">For-You Feed</TabsTrigger>
            <TabsTrigger value="password">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="account"><ForYouFeed /></TabsContent>
          <TabsContent value="password"><FollowingFeed /></TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  )
}

export default HomePage