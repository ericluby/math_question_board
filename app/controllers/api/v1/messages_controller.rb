class Api::V1::MessagesController < ApiController
  skip_before_action :verify_authenticity_token, :only => :create

  # only time this method is called is for image upload. Normal text messages go through action cables
  def create
    message = Message.new()
    message.user = current_user
    message.question_id = params["question_id"]
    message.image = params["image"]
    message.save
    message.body = "https://math-mentors-production.s3.amazonaws.com/uploads/message/image/#{message.id}/#{message.image.filename}"
    message.save

    question = Question.find(params["question_id"])

    messages_json = question.messages.map do |message|
      chat_json = {
        "questionId": message["question_id"],
        "body": message["body"],
        "messageId": message.id,
        "userId": message["user_id"]
      }
    end

    ActionCable.server.broadcast("chat_#{params[:question_id]}", messages_json)
  end

  def message_params
    params.permit(:image)
  end
end