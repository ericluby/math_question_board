class Api::V1::QuestionsController < ApiController
  def index
    questions = Question.order(created_at: :desc).where(classroom_id: params['classroom_id'])
    render json: questions
  end

  def create
    question = Question.new(status: "new", title: params["title"])
    question.user = current_user
    question.classroom_id = params["classroom_id"]
    question.save
    
    render json: question
  end

  def show

  end

  def update
    question = Question.find(params["id"])
    question.status = params["status"]
    question.save
    
    render json: question
  end
end