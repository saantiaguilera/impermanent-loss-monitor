import configJson from '../../config/telegram.json'

interface TelegramConfig {
    readonly accessToken: string
    readonly chatId: string
}

const telegramConfig: TelegramConfig = configJson

const TELEGRAM_ACCESS_TOKEN = telegramConfig.accessToken
const TELEGRAM_CHAT_ID = telegramConfig.chatId

export { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID }