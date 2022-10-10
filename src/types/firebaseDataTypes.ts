export type Message = {
    content: string
    timestamp: number
    writtenBy: string
};

export type Dialog = {
    dialogId: number
    messages: Message[]
    operatorId: number
    saved: boolean
    status: 'active' | 'completed' | 'queue'
    userName: string

    rating?: number
}