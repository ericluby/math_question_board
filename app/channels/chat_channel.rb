class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:chat_id]}"
    # stream_from "chat_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts data
    # Currently, we dont actually use this code that much. But you would have to set up these models if you want to record the conversations in your chat.
    # chat = Question.find_or_create_by(id: params[:chat_id], user: User.find(data["user"]["user_id"]))
    # chat.user_id = data["user"]["user_id"]
    # # temporary
    # chat.title = "hello"
    # chat.status = "new"
    # binding.pry
    # new_message = Message.create(body: data["message"], user: User.find(data["user"]["user_id"]), question: chat)
    
    # chat_key = chat.id
    
    # chat_json = {
    #   "chat_key": chat_key,
    #   "message": new_message.body,
    #   "messageId": new_message.id,
    #   "user": data["user"]
    # }

    # currently hardcoded 
    question = Question.find(params["question_id"])
    Message.create(user_id: data["userId"], question: question, body: data["body"])

    messages_json = question.messages.last(8).map do |message|
      chat_json = {
        "chat_key": 1,
        "questionId": message["question_id"],
        "body": message["body"],
        "messageId": message.id,
        "userId": message["user_id"]
      }
      
      # chat_json = {
      #   "chat_key": 1,
      #   "message": data["message"],
      #   "messageId": 1,
      #   "user": data["user"]
      # }
    end

    ActionCable.server.broadcast("chat_#{params[:chat_id]}", messages_json)
  end
end