import React from 'react'
import PropTypes from 'prop-types'
import Container from '@components/layout/container'
import Accordion from '@components/common/accordion'

const Faq = ({ title = 'Faq', questions }) => {
  return (
    <div className="relative">
      <Container className="px-0">
        <div className="w-full pt-[95px] pb-[120px] md:pb-[150px]">
          <div className="mb-[20px] text-center font-tacticSansExt text-[32px] uppercase md:mb-[60px] md:text-[64px]">
            {title}
          </div>
          <Accordion data={questions} />
        </div>
      </Container>
    </div>
  )
}

Faq.propTypes = {
  title: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      question: PropTypes.objectOf(PropTypes.string),
      answer: PropTypes.objectOf(PropTypes.string),
    })
  ),
}

export default Faq
