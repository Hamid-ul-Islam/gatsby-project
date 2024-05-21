import React from 'react'

const Container = ({ children, className, id }) => (
  <div
    className={`mx-auto flex w-full max-w-screen-2xl px-6 sm:px-8 md:px-10 lg:px-16 xl:px-24 ${className}`}
    id={id}
  >
    {children}
  </div>
)

export default Container
