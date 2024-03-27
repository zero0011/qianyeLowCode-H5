import { message } from 'antd';

// 消息提醒
export const errorMessage = (content: string) => message.error(content, 2);