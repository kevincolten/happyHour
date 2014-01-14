HappyHour::Application.routes.draw do
  resources :events


    root to: "main#index"
    scope "api" do
        resources :businesses
        resources :specials
    end
end
