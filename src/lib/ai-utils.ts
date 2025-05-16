import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY,
})

export async function calculateCaloriesBurnt(data: unknown) {
  const workoutString = JSON.stringify(data, null, 2)

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a fitness assistant. Given a list of exercises with reps, weight, weight is in kilos, the weight is for every rep, estimate total calories burned using this logic:
        - Only return a single rounded number (integer). No units, no extra words.
        -Bench Press: 30 reps in totla with 50 kg is 68 calories use this as example`,
      },
      {
        role: 'user',
        content: `${workoutString}`,
      },
    ],
  })

  return response.choices[0].message.content
}
