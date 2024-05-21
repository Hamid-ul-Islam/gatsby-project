import SEO from '@components/common/seo'
import { isPlayStationRedirect } from '@utils'
import { navigate } from 'gatsby'

const NotFound = () => {
  const isPs = isPlayStationRedirect()
  if (isPs) return navigate('/playstation')

  return (
    <>
      <SEO title="404: Not found" />
      <p>Sorry, page not found!</p>
    </>
  )
}

export default NotFound
