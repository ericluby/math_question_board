class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:question_id]}"
    # stream_from "chat_channel"
   
    question = Question.find(params["question_id"])

    messages_json = question.messages.map do |message|
      chat_json = {
        "questionId": message["question_id"],
        "body": message["body"],
        "messageId": message.id,
        "userId": message["user_id"],
        "profilePhoto": message.user.profile_photo
      }
    end

    ActionCable.server.broadcast("chat_#{params[:question_id]}", messages_json)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data

    # currently hardcoded 
    question = Question.find(params["question_id"])
    Message.create(user_id: data["userId"], question: question, body: data["body"])

    messages_json = question.messages.map do |message|
      chat_json = {
        "questionId": message["question_id"],
        "body": message["body"],
        "messageId": message.id,
        "userId": message["user_id"],
        "profilePhoto": message.user.profile_photo
      }
    end

    ActionCable.server.broadcast("chat_#{params[:question_id]}", messages_json)
  end
end