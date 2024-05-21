import React, { useState } from 'react'
import Container from '@components/layout/container'
import * as styles from './newsletter.module.css'
import { isEmailValid } from '@utils'
import jsonp from 'jsonp'
import axios from 'axios'
import toQueryString from 'to-querystring'
import Button from '@components/common/button'

const Newsletter = ({
  title,
  ctaButtonText,
  inputText,
  emailDisclaimerText,
  successText,
  errorText,
}) => {
  const [state, setState] = useState(newsletter_state.idle)
  const handleZapierSubmit = (e) => {
    e.preventDefault()
    setState(newsletter_state.submitting)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    if (!isEmailValid(email)) {
      setState(newsletter_state.error)
      return
    }
    let params = {
      EMAIL: email,
    }
    params = toQueryString(params)
    const url = `${process.env.GATSBY_NEWSLETTER_API_URL}?${params}`
    axios
      .create({ transformRequest: [(d, _headers) => JSON.stringify(d)] })
      .post(url)
      .then(function (response) {
        setState(newsletter_state.submitted)
      })
      .catch(function (error) {
        setState(newsletter_state.submitted)
      })
  }

  return (
    <>
      <div className="absolute inset-0 bg-black bg-[linear-gradient(180deg,_rgba(12,_226,_255,_0.6)_3%,_rgba(12,_226,_255,_0)_33%),_linear-gradient(180deg,_#00AEEA_-33%,_#061220_70%)]" />
      <div className={`absolute inset-0 ${styles.bg}`} />
      <div>
        <Container className={`z-1 relative`}>
          <div className="flex w-full flex-col items-center justify-center pt-[130px] pb-[100px] text-center md:pt-[196px] md:pb-[146px]">
            <div className="nav-shadow text-center font-tacticSansExt uppercase text-white">
              <div className="text-2xl md:text-[32px] md:text-5xl">
                {title.split(' ')[0]}
              </div>
              <div className="text-2xl md:text-[32px]">
                {title
                  .split(' ')
                  .filter((word, i) => i !== 0)
                  .join(' ')}
              </div>
            </div>
            {state === newsletter_state.submitted ? (
              <div
                className="text-large mt-12 flex w-full max-w-3xl flex-col gap-4 text-center font-tacticSansExt font-extrabold uppercase leading-[22px] text-white drop-shadow-[0px_2px_16px_#4bd4ff]"
                id="sign-up-form-container"
              >
                <p className="text-center">{successText}</p>
                <p className="text-center">{emailDisclaimerText}</p>
              </div>
            ) : (
              <form
                className="mt-12 flex w-full max-w-3xl flex-col justify-center gap-4 md:flex-row"
                onSubmit={handleZapierSubmit}
                title="Newsletter Signup Form"
                aria-live="polite"
                method="POST"
              >
                <div className="relative flex flex-col gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder={inputText}
                    className="h-[60px] w-full rounded border border-black px-[26px]  font-itcGothic text-[18px]  placeholder:text-[18px] placeholder:uppercase focus:outline-none md:w-[390px]"
                    aria-label="newsletter email input"
                  />
                  {state === newsletter_state.error && (
                    <span
                      className="left-2 bottom-[-20px] text-xs uppercase text-white md:absolute"
                      aria-label="error message"
                    >
                      {errorText}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  role="button"
                  text={ctaButtonText}
                  disabled={state === newsletter_state.submitting}
                />
              </form>
            )}
          </div>
        </Container>
      </div>
    </>
  )
}

const newsletter_state = {
  error: 'error',
  submitting: 'submitting',
  submitted: 'submitted',
  idle: 'idle',
}

export default Newsletter
