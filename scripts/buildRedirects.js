const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config({
  path: `.env`,
})

const main = async () => {
  const env = process.env.GATSBY_CONTENTFUL_ENVIRONMENT
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
  const contentType = 'redirect'

  try {
    const queriedRedirects = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${env}/entries?access_token=${accessToken}&content_type=${contentType}`
    ).then((res) => res.json())
    const redirects = queriedRedirects?.items?.map(({ fields }) => fields)

    if (!redirects) {
      return console.info(
        'No redirects found. Nothing will be built to public folder.'
      )
    }

    console.info(`Found ${redirects.length} redirects.`)
    const redirectsPath = path.join(__dirname, '../public', 'redirects.json')

    fs.writeFileSync(redirectsPath, JSON.stringify(redirects))
    console.info(`Redirects saved to ${redirectsPath}`)
  } catch (error) {
    console.error('Error saving redirects:')
    console.error(error)
  }
}

main()
