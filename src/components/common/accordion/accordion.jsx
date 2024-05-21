import React, { useState } from 'react'
import AccordionItem from './accordionItem'

const Accordion = ({ data }) => {
  const [expandedItem, setExpandedItem] = useState(null)

  const onClickItem = (index) => {
    expandedItem === index ? setExpandedItem(null) : setExpandedItem(index)
  }

  return (
    <div className="accordion relative mx-auto block">
      {data?.map((qAndA, i) => {
        const isActive = expandedItem === i
        return (
          <AccordionItem
            key={i}
            item={qAndA}
            onClickItem={() => onClickItem(i)}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}

export default Accordion
