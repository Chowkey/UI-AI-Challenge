import React from 'react'

interface Props {
  src: string,
  alt: string,
  content: string,
}

const Display = ({
  src,
  alt,
  content,
}: Props) => {
  return (
    <div>
      <img src={src} alt={alt} className="object-fit w-full h-[90%]"/>
      <h1 className="font-inter my-0 text-white text-base">{content}</h1>
    </div>
  )
}

export default Display