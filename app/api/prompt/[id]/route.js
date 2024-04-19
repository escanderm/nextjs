import { connectToDb } from '@utils/database'
import Prompt from '@models/prompt'

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDb()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (err) {
    console.log('api prompt', err)
    return new Response('Failed to get prompt', { status: 500 })
  }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDb()
    const existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (e) {
    console.log('api prompt', e)
    return new Response('Failed to update prompt', { status: 500 })
  }
}
// DELETE (remove)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDb()
    await Prompt.findByIdAndDelete(params.id)
    return new Response('Successfully deleted', { status: 200 })
  } catch (e) {
    console.log('api prompt', e)
    return new Response('Failed to delete prompt', { status: 500 })
  }
}
