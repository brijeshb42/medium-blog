import json


class ArticlesResource(object):

    def on_get(self, req, resp):
        articles = []
        for i in range(20):
            articles.append({
                'id': i + 1,
                'title': 'This is title {}'.format(i + 1),
                'summary': 'This is the summary of article {}'.format(i + 1),
            })
        resp.body = json.dumps({
            'result': articles
        })


class ArticleResource(object):

    def on_get(self, req, resp, aid):
        resp.body = json.dumps({
            'id': int(aid),
            'title': 'This is title {}'.format(aid),
            'summary': 'This is the summary of article {}'.format(aid),
            'content': {
                "ops": [{
                    "insert": "HHH {}".format(aid)
                }, {
                    "attributes": {"blockquote": True},
                    "insert": "\n"
                }, {
                    "insert": "Yet "
                }, {
                    "attributes": {"bold": True},
                    "insert": "another"
                }, {
                    "insert": " quote"
                }, {
                    "attributes": {"blockquote": True},
                    "insert": "\n"
                }, {
                    "insert": "Hello World.\n"
                }]
            }
        })
