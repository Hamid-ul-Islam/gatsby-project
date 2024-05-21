import React from 'react'
import { featureFlags, isFeatureEnabled } from '@featureflags'
import useLocalStorage, { LOCAL_STORAGE_KEYS } from '@hooks/useLocalStorage'
import BreakpointDisplay from './components/BreakpointDisplay'
import ContentfulLink from './components/ContentfulLink'
import PreviewToggle from './components/PreviewToggle'
import Toggler from './toggler'
import { isPreviewPage } from '@utils/preview'
import { isSSR } from '@utils'
import PreviewSamplesLink from './components/PreviewSamplesLink'

const UserTools = (props) => {
  const [expanded, setExpanded] = useLocalStorage(
    LOCAL_STORAGE_KEYS.USER_TOOLS_EXPANDED,
    false
  )

  if (isSSR()) return null
  if (isFeatureEnabled(featureFlags.DISABLE_USER_TOOLS)) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-3.5 flex-row items-end">
      <div className={`my-1 pr-0 md:my-0 ${expanded ? 'md:pr-2' : 'md:pr-0'}`}>
        <Toggler
          expanded={expanded}
          onClick={() => setExpanded((expand) => !expand)}
        />
      </div>
      {expanded && (
        <>
          <div className="my-1 pr-0 md:my-0 md:pr-2">
            <BreakpointDisplay />
          </div>
          {props.contentful_id && (
            <div className="my-1 pr-0 md:my-0 md:pr-2">
              <ContentfulLink {...props} />
            </div>
          )}
          {isPreviewPage() && (
            <div className="my-1 pr-0 md:my-0 md:pr-2">
              <PreviewSamplesLink />
            </div>
          )}
          <div className="my-1 md:my-0">
            <PreviewToggle {...props} />
          </div>
        </>
      )}
    </div>
  )
}

export default UserTools
