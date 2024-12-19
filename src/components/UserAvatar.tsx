import Image from 'next/image'
import React from 'react'
import avatarImage from "@/assets/avatar.png"
import { cn } from '@/lib/utils'

interface UserAvatarProps {
    avatarUrl: string | null | undefined
    className?: string
    size?: number
}


const UserAvatar = ({ avatarUrl, className, size }: UserAvatarProps) => {
    return (
        <Image
            src={avatarUrl || avatarImage}
            alt='User Image'
            height={size ?? 48}
            width={size ?? 48}
            className={cn("rounded-full object-cover h-fit ", className)}
        />
    )
}

export default UserAvatar