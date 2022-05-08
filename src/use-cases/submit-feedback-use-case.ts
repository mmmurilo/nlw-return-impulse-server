import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRespository } from "../repositories/feedbacks-repository";

interface SubmmitFeedbackUseCaseRequest {
    type: string
    comment: string
    screenshot: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRespository,
        private mailAdapter: MailAdapter
    ) {}
    
    async execute(request: SubmmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if (!type)
            throw new Error('Type is required')
            
        if (!comment)
            throw new Error('Comment is required')

        if (screenshot && !screenshot.startsWith('data:image/png;base64'))
            throw new Error('Invalid image format')

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div>`,
                `<p>Tipo do Comentário: ${type}<p>`,
                `<p>Comentário: ${comment}<p>`,
                screenshot ? `<img src="${screenshot}"` : '',
                `</div>`
            ].join('\n')
        })
    }
}