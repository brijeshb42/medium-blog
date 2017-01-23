from wsgiref import simple_server

import falcon

from medium_blog.api.articles import (
    ArticlesResource,
    ArticleResource
)


class AccessControlMiddleWare(object):

    def process_request(self, req, resp):
        if req.get_header('Origin'):
            resp.set_header(
                'Access-Control-Allow-Origin', req.get_header('Origin'))


api = falcon.API(middleware=[
    AccessControlMiddleWare(),
])
api.add_route('/articles', ArticlesResource())
api.add_route('/articles/{aid}', ArticleResource())

if __name__ == '__main__':
    print('Running server...')
    httpd = simple_server.make_server('0.0.0.0', 5000, api)
    httpd.serve_forever()
