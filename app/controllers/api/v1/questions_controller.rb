class Api::V1::QuestionsController < ApiController
  def index
    binding.pry
    # questions = Question.where(classroom_id: params['classroom_id'])

    # render json: questions
    render json: Question.all
  end

  def create
    question = Question.new(status: "new", title: params["title"])
    question.user = current_user
    question.save

    render json: question
  end
end