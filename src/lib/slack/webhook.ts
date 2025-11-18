import { IncomingWebhook } from '@slack/webhook';
import type { ContactFormData } from '@/lib/validations/contact';

/**
 * Create Slack webhook instance
 */
function createWebhook() {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  console.log('💬 [createWebhook] Slack webhook URL:', webhookUrl ? `${webhookUrl.substring(0, 50)}...` : 'NOT SET');

  if (!webhookUrl) {
    throw new Error('SLACK_WEBHOOK_URL environment variable is not set');
  }

  return new IncomingWebhook(webhookUrl);
}

/**
 * Map user type to emoji and label
 */
function getUserTypeInfo(userType: string): { emoji: string; label: string } {
  const typeMap: Record<string, { emoji: string; label: string }> = {
    enterprise: { emoji: '🏢', label: 'Enterprise (Needs transportation for employees)' },
    operator: { emoji: '🚗', label: 'Operator (Has vehicles to offer)' },
  };
  return typeMap[userType] || { emoji: '👤', label: userType };
}

/**
 * Send Slack notification with rich Block Kit formatting
 */
export async function sendSlackNotification(data: ContactFormData): Promise<void> {
  console.log('💬 [sendSlackNotification] Starting Slack notification send...');
  console.log('💬 [sendSlackNotification] Data:', {
    name: data.name,
    email: data.email,
    company: data.company,
    userType: data.userType,
  });

  const webhook = createWebhook();
  console.log('💬 [sendSlackNotification] Webhook created');

  const userTypeInfo = getUserTypeInfo(data.userType);
  console.log('💬 [sendSlackNotification] User type info:', userTypeInfo);

  const payload = {
    text: `🎯 New Lead from Tranzkit Website: ${data.name} from ${data.company}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🎯 New Lead from Tranzkit Website`,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${userTypeInfo.emoji} ${userTypeInfo.label}*`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*👤 Name:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*📧 Email:*\n<mailto:${data.email}|${data.email}>`,
          },
          {
            type: 'mrkdwn',
            text: `*🏢 Company:*\n${data.company}`,
          },
          {
            type: 'mrkdwn',
            text: `*📞 Phone:*\n<tel:${data.phone}|${data.phone}>`,
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*💬 Message:*\n${data.message}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `⏰ Submitted at: ${new Date().toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📧 Reply via Email',
              emoji: true,
            },
            url: `mailto:${data.email}`,
            style: 'primary',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📞 Call',
              emoji: true,
            },
            url: `tel:${data.phone}`,
          },
        ],
      },
    ],
  };

  console.log('💬 [sendSlackNotification] Payload prepared, sending...');

  try {
    const result = await webhook.send(payload);
    console.log('💬 [sendSlackNotification] Slack notification sent successfully:', result);
  } catch (error) {
    console.error('💬 [sendSlackNotification] Failed to send Slack notification:', error);
    throw error;
  }
}

