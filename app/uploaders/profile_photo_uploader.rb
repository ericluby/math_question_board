class ProfilePhotoUploader < CarrierWave::Uploader::Base
  if !Rails.env.test?
    storage :fog
  else
    storage :file

    # def store_dir
    #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    # end
  end

end
