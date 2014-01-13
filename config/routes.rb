HappyHour::Application.routes.draw do
    root to: "main#index"
    scope "api" do
        resources :businesses
    end
end
