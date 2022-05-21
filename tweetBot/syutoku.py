import tweepy
import csv
import random
import define

auth = tweepy.OAuthHandler(define.CONSUMER_KEY, define.CONSUMER_SECRET)
auth.set_access_token(define.ACCESS_TOKEN, define.ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

tweet_data = []

#ツイート取得
for id in define.id_list:
	for tweet in tweepy.Cursor(api.user_timeline,screen_name = id,exclude_replies = True,include_rts= False).items(20):
		#if tweet.text.find('http') == -1:
		tweet_data.append([tweet.text.replace('\n','').replace('\'','&sing').replace('\"','&quot').replace(',','&cam')])

#txt出力
random.shuffle(tweet_data)
with open('tweets.txt', 'w',newline='',encoding='utf-8') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerows(tweet_data)
pass