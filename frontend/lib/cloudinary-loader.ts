'use client'

import type { ImageLoaderProps } from 'next/image'

const uploadRoot = 'https://res.cloudinary.com/wwgwrs4y/image/upload/'

/** Resize Cloudinary images to the width the browser asked for. */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  // Local files (logos and similar) keep their own URLs.
  if (!src.startsWith(uploadRoot)) return src
  // Replace the delivery transformation from cloudinaryImage() instead of stacking it.
  const asset = src.slice(uploadRoot.length).replace(/^f_auto,q_[a-z0-9]+,(c_limit,)?w_\d+\//, '')
  return `${uploadRoot}f_auto,q_${quality ?? 'auto'},c_limit,w_${width}/${asset}`
}
