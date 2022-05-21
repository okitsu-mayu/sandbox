import tweepy
from janome.tokenizer import Tokenizer
import csv
from nltk.util import ngrams
from nltk.lm import Vocabulary
from nltk.lm.models import MLE

import define

auth = tweepy.OAuthHandler(define.CONSUMER_KEY, define.CONSUMER_SECRET)
auth.set_access_token(define.ACCESS_TOKEN, define.ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

file = 'wakachi.txt'

words = [('<BOP> ' + l + ' <EOP>').split() for l in open(file, 'r', encoding='utf-8').readlines()]
vocab = Vocabulary([item for sublist in words for item in sublist])
text_bigrams = [ngrams(word, 2) for word in words]
text_trigrams = [ngrams(word, 3) for word in words]
lm2 = MLE(order = 2, vocabulary = vocab) 
lm3 = MLE(order = 3, vocabulary = vocab)
lm2.fit(text_bigrams) 
lm3.fit(text_trigrams)

context = ['<BOP>']
w= lm2.generate(text_seed=context)
context.append(w)
for i in range(0, 100):
    w = lm3.generate(text_seed=context)
    context.append(w)
    if '<EOP>' == w:
        context.remove('<BOP>')
        context.remove('<EOP>')
        res=''.join(context)
        api.update_status(res)
        break