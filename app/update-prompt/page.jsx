'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = async () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const router = useRouter()
  // const searchParams = useSearchParams()
  // const promptId = searchParams.get('id')

  useEffect(() => {
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }

    if (promptId) getPromptDetails()
  }, [])

  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/profile')
      }
    } catch (e) {
      console.log('updatePrompt', e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt
