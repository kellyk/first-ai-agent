import type { AIMessage } from '../types'
import { openai } from './ai'
import {zodFunction} from "openai/helpers/zod";

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[],
  tools: any[],
}) => {
  const formattedTools = tools.map(tool => zodFunction(tool));
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.1,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
}
