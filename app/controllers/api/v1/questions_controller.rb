class Api::V1::QuestionsController < ApiController
  def index
    questions = Question.where(classroom_id: params['classroom_id'])

    render json: questions
  end

  def create
    question = Question.new(status: "new", title: params["title"])
    question.user = current_user
    question.classroom_id = params["classroom_id"]
    question.save

    render json: question
  end
end