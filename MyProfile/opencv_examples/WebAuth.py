# import requests module
import requests
from requests.auth import HTTPBasicAuth
# Making a get request
response = requests.get('http://10.10.30.36/Login.xbc?PreLogin()',auth = HTTPBasicAuth('admin', 'admin'))
# print request object
print(response)
print(response.is_permanent_redirect)
print(response.cookies)
print(response.is_redirect)
# print(response.content)