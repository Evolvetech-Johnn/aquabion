import sys
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'button', 'a', 'img']:
            print("  " * len(self.tags) + f"<{tag}>")
            if tag == 'img':
                for attr in attrs:
                    if attr[0] == 'src':
                        print("  " * (len(self.tags)+1) + f"src: {attr[1]}")
    def handle_endtag(self, tag):
        if self.tags and self.tags[-1] == tag:
            self.tags.pop()
        else:
            # Handle unclosed tags simply
            while self.tags and self.tags[-1] != tag:
                self.tags.pop()
            if self.tags:
                self.tags.pop()
    def handle_data(self, data):
        data = data.strip()
        if data and self.tags and self.tags[-1] in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'button', 'a', 'span']:
            print("  " * len(self.tags) + data)

with open(r'C:\Users\dlpun\.gemini\antigravity-ide\brain\1e783258-15ea-4961-8265-a5ac17cafbdd\.system_generated\steps\9\content.md', 'r', encoding='utf-8') as f:
    parser = MyHTMLParser()
    parser.feed(f.read())
