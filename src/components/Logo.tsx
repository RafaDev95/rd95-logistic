'use client'

import Image from 'next/image'

const Logo = () => {
  return (
    <Image src='/logo.png' fill style={{ objectFit: 'contain' }} alt='Delivery package with text' />
  )
}
export default Logo
