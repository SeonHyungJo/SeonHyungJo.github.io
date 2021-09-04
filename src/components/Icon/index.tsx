import React from 'react'

import nameCard from '@data/nameCard'

const { sns } = nameCard

import { default as EmailIconItem } from './EmailIcon'
import { default as FacebookIconItem } from './FacebookIcon'
import { default as GithubIconItem } from './GithubIcon'
import { default as InstagramIconItem } from './IntagramIcon'
import { default as LinkedinIconItem } from './LinkedinIcon'
import { default as TwitterIconItem } from './TwitterIcon'
import { default as YoutubeIconItem } from './YoutubeIcon'

export const EmailIcon = (): JSX.Element => (<EmailIconItem href={`mailto:${sns.email}`} />)
export const FacebookIcon = (): JSX.Element => (<FacebookIconItem href={`${sns.facebook}`} />)
export const GithubIcon = (): JSX.Element => <GithubIconItem href={`${sns.github}`} />
export const InstagramIcon = (): JSX.Element => <InstagramIconItem href={`${sns.instagram}`} />
export const LinkedinIcon = (): JSX.Element => <LinkedinIconItem href={`${sns.linkedin}`} />
export const TwitterIcon = (): JSX.Element => <TwitterIconItem href={`${sns.twitter}`} />
export const YoutubeIcon = (): JSX.Element => <YoutubeIconItem href={`${sns.youtube}`} />
