"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

function page() {
  const data = useState(0)
  return (
    <Link href={"/home"}>
      <div>producto detalle</div>
    </Link>
  )
}

export default page