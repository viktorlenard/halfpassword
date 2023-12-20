import random
import json
import string
import os

'''
File for all backend functions. List of functions at the top,
more detailed explanation with the respective code below.
    
    def password_validator(dict) - Validate password request.
    def password_generator(dict) - Generate password based on a validated request. 

'''


''' 
Database containing a dict, with strings as the keys,
and their length as the value. English words only. Currently
limited to lengths between 5-7 
'''

dir_path = os.path.dirname(os.path.realpath(__file__))
json_path = os.path.join(dir_path, 'words.json')
with open(json_path) as f:
    data = json.load(f)
'''
Password request in the form of a dict. Would be coming 
from the user in the form of inputs on the website. For testing.

'''

password_request = {
    'human': True,
    'length': 4,
    'div': '-',
    'caps': True,
    'nums': True,
    'valid': None
}

'''
Validate the request to avoid HTML shenanigans.
Thorws an error if any of the value is outside of what
the generator expects. 
Changes 'valid' to True and returns the updated request.
'''

def request_validator(pr):
    if pr['human'] not in [True, False]:
       pr['valid'] = False
       raise ValueError('Invalid request. 1')
    if pr['length'] < 3 or pr['length'] > 8:
        pr['valid'] = False
        raise ValueError('Invalid request. 2')
    if pr['div'] not in ['.', '_', '-']:
        pr['valid'] = False
        raise ValueError('Invalid request. 3')
    if pr['caps'] not in [True, False]:
        pr['valid'] = False
        raise ValueError('Invalid request. 4')
    if pr['nums'] not in [True, False]:
        pr['valid'] = False
        raise ValueError('Invalid request. 5')
    
    pr['valid'] = True
    return pr

'''
Password generator function. Expects a dict, returns a string.
Checks for a validated request first. 
'human' passwords should be easily readable and use words from the database.
'div' is the divider between words, chosen by the user.
'length' is the amount of words the password is made up of. 3-8
'caps' capitalise a random word.
'nums' should add a random 2 digit int at the end of a random word.

Non 'human' passowords are made up of words generated of ascii letters, numbers and 
some special chars (divs can't show in the words themselves). 
Doesn't check for 'nums' or 'caps' as they must include.
'''

def password_generator(pr):
    if pr['valid'] != True:
        raise ValueError('Invalid request. Cannot generate.')
    words = []
    if pr['human'] is True:
        for _ in range(pr['length'] - 1):
            words.append(random.choice(list(data.keys())).title())
            words.append(pr['div'])
        words.append(random.choice(list(data.keys())).title())
        if pr['nums'] is True:
            index = int(random.randrange(0, (pr['length']*2)-1, 2))
            numbers = ''.join(random.choice(string.digits)for i in range(2))
            words[index] = words[index] + numbers
        if pr['caps'] is True:
            index = int(random.randrange(0, (pr['length']*2)-1, 2))
            words[index] = words[index].upper()
        password = ''.join([str(item) for item in words])
    else:
        for _ in range(pr['length'] - 1):
            word = ''.join(random.choice(string.ascii_letters + string.digits + '!#$%&*') for i in range(random.randint(5, 8)))
            words.append(word)
            words.append(pr['div'])
        word = ''.join(random.choice(string.ascii_letters + string.digits + '!#$%&*') for i in range(random.randint(5, 8)))
        words.append(word)
        password = ''.join([str(item) for item in words])

    return password


def main():
    request_validator(password_request)
    password = password_generator(password_request)
    print(password)

if __name__ == "__main__":
    main()