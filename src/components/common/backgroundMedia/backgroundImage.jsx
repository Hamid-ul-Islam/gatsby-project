import PropTypes from 'prop-types'
import Image from '@components/common/image'

const BackgroundImage = ({ image }) => {
  if (!image) return null

  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Image src={image} className="h-full w-full object-cover" />
    </div>
  )
}

BackgroundImage.propTypes = {
  image: PropTypes.object,
}

export default BackgroundImage
