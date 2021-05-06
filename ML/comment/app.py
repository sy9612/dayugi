from typing import List
from textrankr.textrankr import TextRank


class MyTokenizer:
    def __call__(self, text: str) -> List[str]:
        tokens: List[str] = text.split()
        return tokens


mytokenizer: MyTokenizer = MyTokenizer()
textrank: TextRank = TextRank(mytokenizer)

k: int = 3  # num sentences in the resulting summary

your_text_here = '''수요일은 특식 데이이다. 학교 급식에서 '잔반 없는 날'이라고 하여 맛있는 급식을 주는 날이다. 바로 오늘이 수요일이라 아침부터 기대가 되었다. 오늘의 반찬은 치킨 샐러드와 스파게티, 옥수수 수프 그리고 고구마튀김이 나와서 친구들 모두 좋아했다. 그중에서 스파게티는 내 짝 정연이가 좋아하는 음식이다. 정연이는 돈가스와 스파게티를 제일 좋아한다.
내가 제일 좋아하는 만두는 없어서 아쉬웠지만, 정연이가 만두가 맛있는 분식집을 알려주어서 아쉬운 마음이 사라졌다. 주말에 엄마 아빠에게 그 분식집에 가보자고 해야지. 매주 수요일마다 얼마나 맛있는 반찬이 나올까 궁금해진다. 다음 주 수요일도 빨리 왔으면!'''

summarized: str = textrank.summarize(your_text_here, k)
print(summarized)  # gives you some text

# if verbose = False, it returns a list
# summaries: List[str] = textrank.summarize(your_text_here, k, verbose=False)
# for summary in summaries:
#     print(summary)