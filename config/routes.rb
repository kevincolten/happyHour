HappyHour::Application.routes.draw do
    root to: "main#index"

    scope "api" do
        resources :businesses
        resources :specials
        resources :events
        resources :form
        resources :days
    end
end
