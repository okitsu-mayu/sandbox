from janome.tokenizer import Tokenizer
import csv

file = 'wakachi.txt'
t = Tokenizer()

f = open(file, 'w', encoding='utf-8')
with open('tweets.txt', 'r', encoding='utf-8') as line:    
    f = open(file, 'w', encoding='utf-8')
    writer = csv.writer(f, lineterminator='')
    for k in line:
        s=[]
        for token in t.tokenize(k.replace('&sing','\'').replace('&quot','\"').replace('&cam',',')):
            if s==[]:
                s=token.surface
            else:
                s=s+' '+token.surface
        ss=''.join(s)
        ss=ss+"\n"
        ss=ss.replace('\"\"\"\"\"','').strip(" ")
        f.write(ss) # 引数の文字列をファイルに書き込む
    f.close() # ファイルを閉じる