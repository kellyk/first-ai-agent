import { addMessages, getMessages } from "./memory"
import { runLLM } from "./llm";
import { showLoader, logMessage } from "./ui";

export const runAgent = async ({userMessage, tools}: {userMessage: string, tools: any}) => {
  await addMessages([{role: 'user', content: userMessage}])
  const loader = showLoader('Thinking...');
  const history = await getMessages();
  const response = await runLLM({messages: history, tools});
  await addMessages([response]);
  if (response.tool_calls) {
    console.log('Tool calls:', response.tool_calls);
    const toolCallId = response.tool_calls[0].id;
    addMessages([
      { role: 'tool', content: 'The weather is sunny', tool_call_id: toolCallId },
    ])
  }
  loader.stop();
  logMessage(response);
  return getMessages();
}
