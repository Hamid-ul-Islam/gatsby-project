import PropTypes from 'prop-types'
import BackgroundImage from './backgroundImage'
import BackgroundVideo from './backgroundVideo'

const BackgroundMedia = ({
  backgroundMedia,
  videoTriggerStart = 'top center',
  videoTriggerEnd = 'bottom center',
  useImageFallbackMobile = false,
}) => {
  if (!backgroundMedia) return null

  const { type, video, image } = backgroundMedia

  if (type === 'Video') {
    return (
      <BackgroundVideo
        src={video?.file?.url}
        poster={image?.file?.url}
        videoTriggerStart={videoTriggerStart}
        videoTriggerEnd={videoTriggerEnd}
        useImageFallbackMobile={useImageFallbackMobile}
      />
    )
  }

  if (type === 'Image') {
    return <BackgroundImage image={image} />
  }

  return null
}

BackgroundMedia.propTypes = {
  backgroundMedia: PropTypes.object,
  videoTriggerStart: PropTypes.string,
  videoTriggerEnd: PropTypes.string,
  useImageFallbackMobile: PropTypes.bool,
}

export default BackgroundMedia
