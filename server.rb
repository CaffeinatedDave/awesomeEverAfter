require 'bcrypt'
require 'dotenv'
require 'erb'
require 'logger'
require 'securerandom'

require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/base'
require 'sinatra/flash'


Dotenv.load

use Rack::Logger
use Rack::Session::Cookie, :key => 'awesome.ever.after',
                           :domain => ENV['DOMAIN'],
                           :path => '/',
                           :expire_after => 60 * 60 * 24, # 1 day.
                           :secret => ENV['COOKIE_SECRET']

configure do
  db = URI.parse(ENV['DB_URL'])

  ActiveRecord::Base.establish_connection(
    :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => ENV['DB_PASS'],
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end

before do
  @user = nil# get_user(session[:user_id])
end

get '/?' do
  erb :index
end
