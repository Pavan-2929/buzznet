import Link from 'next/link'
import React from 'react'
import { LinkIt, LinkItUrl } from 'react-linkify-it'

interface LinkifyProps {
    children: React.ReactNode
}
const Linkify = ({ children }: LinkifyProps) => {
    return (
        <LinkifyUrl>
            <LinkifyUsername>
                <LinkifyHashtag>
                    {children}
                </LinkifyHashtag>
            </LinkifyUsername>
        </LinkifyUrl>
    )
}

const LinkifyUrl = ({ children }: LinkifyProps) => {
    return (
        <LinkItUrl className='text-primary hover:underline'>
            {children}
        </LinkItUrl>
    )
}

const LinkifyUsername = ({ children }: LinkifyProps) => {
    return (
        <LinkIt regex={/(@[a-zA-Z0-9_-]+)/}
            component={(match, key) => (
                <Link className='text-primary hover:underline' key={key} href={`/user/${match.slice(1)}`}>
                    {match}
                </Link>
            )}
        >
            {children}
        </LinkIt>
    )
}

const LinkifyHashtag = ({ children }: LinkifyProps) => {
    return (
        <LinkIt regex={/(#[a-zA-Z0-9]+)/} component={(match, key) => (
            <Link className='text-primary hover:underline' key={key} href={`/hashtag/${match.slice(1)}`}>
                {match}
            </Link>
        )}>
            {children}
        </LinkIt>
    )
}

export default Linkify
