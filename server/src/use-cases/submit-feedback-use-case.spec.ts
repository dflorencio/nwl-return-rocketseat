import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
    { create:createFeedbackSpy},
    { sendMail: sendMailSpy}
)


describe('Submit Feedback', () => {

    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,84568asdqwd5465wd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })  

    it('shold not be able to submit fedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64,84568asdqwd5465wd',
        })).rejects.toThrow();
    })  


    it('shold not be able to submit fedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,84568asdqwd5465wd',
        })).rejects.toThrow()
    })  

    it('shold not be able to submit fedback without an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: '84568asdqwd5465wd.jpg',
        })).rejects.toThrow()
    })  

});