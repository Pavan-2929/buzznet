import useFollowersInfo from '@/hooks/useFollowersInfo'
import { FollowerInfo } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import React from 'react'

interface FollowerCountProps {
    userId: string
    initialState: FollowerInfo
}

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {

    const { data } = useFollowersInfo(userId, initialState)
    return (
        <span>
            Followers: {""}
            <span>{formatNumber(data.totalFollowers)}</span>
        </span>
    )
}

export default FollowerCount
