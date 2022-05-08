import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64.teste.jpg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64.teste.jpg'
        })).rejects.toThrow()
    })
    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64.teste.jpg'
        })).rejects.toThrow()
    })
    it('should not be able to submit feedback with invalid screenshow', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comment',
            screenshot: 'teste.jpg'
        })).rejects.toThrow()
    })
})