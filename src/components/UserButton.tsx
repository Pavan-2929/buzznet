"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import { useSession } from '@/app/(main)/SessionProvider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LogOut, UserIcon } from 'lucide-react'
import { logoutAction } from '@/app/(auth)/actions'

interface UserButtonProps {
    className?: string
}

const UserButton = ({ className }: UserButtonProps) => {

    const { user } = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("rounded-full", className)}>
                    <UserAvatar avatarUrl={user.avatarUrl}  />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Logged In as @{user.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/user/${user.username}`}>
                    <DropdownMenuItem>
                        <UserIcon className='mr-2 size-4' />
                        Profile
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    logoutAction()
                }}>
                    <LogOut className='mr-2 size-4' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton