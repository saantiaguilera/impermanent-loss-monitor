interface HttpResponse<T = any> {
    data: T
    status: number
}

interface HttpClient {

    post<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: any): Promise<R>
}

export class TelegramClient {

    private httpClient: HttpClient

    private url: string
    private chatId: string

    constructor(httpClient: HttpClient, accessToken: string, chatId: string) {
        this.httpClient = httpClient
        this.url = "https://api.telegram.org/bot" + accessToken + "/sendMessage"
        this.chatId = chatId
    }

    async sendMessage(msg: string) {
        await this.httpClient.post(this.url, {
            chat_id: this.chatId,
            text: msg,
            disable_notification: false,
        });
    }
}