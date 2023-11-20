const apiUrl = 'https://1qi8uc9jyf.execute-api.us-east-1.amazonaws.com/prod';

interface SendFeedbackRequest {
  email: string;
  message: string;
  type: string;
  satisfied: string;
}

type SendFeedbackResponse = unknown;

export async function sendFeedback(
  request: SendFeedbackRequest
): Promise<SendFeedbackResponse> {
  const resp = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return resp.json();
}
