import { connectToDb } from '@utils/database'
import Prompt from '@models/prompt'

export const GET = async (request, { params }) => {
  try {
    await connectToDb()

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err) {
    console.log('api prompt', err)
    return new Response('Failed to get prompts', { status: 500 })
  }
}
