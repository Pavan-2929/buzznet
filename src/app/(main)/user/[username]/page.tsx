import { validateRequest } from '@/auth'
import TrendsSidebar from '@/components/Sidebar/TrendsSidebar'
import prisma from '@/lib/prisma'
import { getUserDataSelect } from '@/lib/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import Profile from './Profile'
import UserPosts from './UserPosts'

interface ProfilePageProps {
    params: { username: string }
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: 'insensitive',
            },
        },
        select: getUserDataSelect(loggedInUserId)
    })

    if (!user) notFound()

    return user
})

export async function generateMetadata({ params: { username } }: ProfilePageProps): Promise<Metadata> {
    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) return {}

    const user = await getUser(username, loggedInUserId.id)

    return {
        title: `${user.displayName} ($${user.username})`
    }
}

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {

    const { user: loggedInUserId } = await validateRequest()

    if (!loggedInUserId) {
        return (
            <p className='text-destructive '>You are not authorized to view this page</p>
        )
    }

    const user = await getUser(username, loggedInUserId.id)
    console.log(user);

    return (
        <main className='w-full mt-[6px] flex gap-5 h-fit'>
            <div className='w-full space-y-5 '>
                <Profile user={user} loggedInUserId={loggedInUserId.id} />
                <div className='font-bold text-center bg-card rounded-2xl shadow-sm p-5 text-2xl'>
                    {user.username}&apos;s posts
                </div>
                <UserPosts userId={user.id} />
            </div>
            <TrendsSidebar />
        </main>
    )
}

export default ProfilePage