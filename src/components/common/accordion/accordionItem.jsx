import React, { useEffect, useRef } from 'react'
import IconExpandArrow from '@images/icons/expand-arrow.svg'
import IconCollapseArrow from '@images/icons/collapse-arrow.svg'
import gsap, { Linear, Back } from 'gsap'
import { renderRichText } from '@components/common/richText'

const AccordionItem = ({ item, onClickItem, isActive }) => {
  const panelRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const timelineRef = useRef(gsap.timeline({ paused: true }))

  useEffect(() => {
    const panel = panelRef.current
    const header = headerRef.current
    const content = contentRef.current
    const ctx = gsap.context(() => {
      timelineRef.current.to(header, {
        duration: 0.2,
        ease: Linear.easeNone,
      })

      if (!panel.classList.contains('closed')) {
        timelineRef.current.paused(false)
        gsap.to(content, { duration: 0.3, height: 0, borderTopWidth: 0 })
        panel.classList.add('closed')
      } else {
        if (isActive) {
          timelineRef.current.paused(true)
          gsap.set(content, { height: 'auto' })
          gsap.from(content, {
            duration: 0.5,
            height: 0,
            borderTopWidth: 0,
            ease: Back.easeOut.config(1.4),
          })
          panel.classList.remove('closed')
        }
      }
    })
    return () => {
      ctx.revert()
    }
  }, [isActive])

  return (
    <div
      ref={panelRef}
      className={`panel closed relative mx-auto my-2 block overflow-hidden`}
    >
      <div
        ref={headerRef}
        className="panel-header font-xl flex cursor-pointer items-center justify-start font-bold uppercase hover:underline"
        onClick={onClickItem}
      >
        <div
          className={`relative flex h-[72px] w-[64px] min-w-[64px] items-center justify-center transition-all duration-300 ease-in-out`}
        >
          <div
            className={`absolute ${
              isActive ? 'top-0 opacity-100' : 'top-2 opacity-0'
            } transition-all duration-300 ease-in-out`}
          >
            <IconCollapseArrow />
          </div>
          <div
            className={`absolute ${
              isActive ? 'top-2 opacity-0' : 'top-0 opacity-100'
            } flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out`}
          >
            <IconExpandArrow />
          </div>
        </div>
        {item?.question?.question || item.question}
        {/* <span className="spacer absolute bottom-0 ml-[64px] hidden h-[3px] bg-black md:block"></span> */}
      </div>
      <div ref={contentRef} className="panel-content relative h-0 font-medium">
        <div className="item decoration-none block w-full pl-[64px] pr-11">
          <span>{renderRichText(item?.richText, { fakeButton: false })}</span>
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
