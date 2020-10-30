class Api::V1::QuestionsController < ApiController
  def index
    binding.pry
    render json: Question.all
  end

  def create
    binding.pry
    question = Question.new(status: "new", title: params["title"])
    question.user = current_user
    question.save

    render json: question
  end
end