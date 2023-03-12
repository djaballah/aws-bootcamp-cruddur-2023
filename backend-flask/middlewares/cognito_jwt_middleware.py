from werkzeug.wrappers import Request, Response, ResponseStream
import logging
from lib.cognito_jwt_token import CognitoJwtToken, extract_access_token, TokenVerifyError
import os

LOGGER = logging.getLogger("app")

class CognitoJwtMiddleware:

    def __init__(self, app):
        self.app = app
        # Cognito jwt
        self.cognito_jwt_token = CognitoJwtToken(
            user_pool_id=os.getenv("AWS_COGNITO_USER_POOL_ID"),
            user_pool_client_id=os.getenv("AWS_COGNITO_USER_POOL_CLIENT_ID"),
            region=os.getenv("AWS_DEFAULT_REGION")
        )

    def __call__(self, environ, start_response):
        request = Request(environ)
        access_token = extract_access_token(request.headers)
        if access_token is None:
            return self.app(environ, start_response)
        try:
            claims = self.cognito_jwt_token.verify(access_token)
            # authenicatied request
            LOGGER.debug("authenicated")
            environ['username'] = claims['username']
            return self.app(environ, start_response)

        except TokenVerifyError as e:
            # unauthenicatied request
            LOGGER.debug("unauthenicated")
            return self.app(environ, start_response)
