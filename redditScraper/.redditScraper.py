import os
import sys
import requests
from selenium import webdriver
from bs4 import BeautifulSoup

ARG_COUNT = len(sys.argv)
SUB = sys.argv[1]
DIR = sys.argv[2]
URL = f"https://old.reddit.com/r/{SUB}"
chromedriver = '/Users/patrickmclennan/chromedriver/chromedriver'


class Image:
    def __init__(self, name, href, domain):
        self.name = name
        self.href = href
        self.domain = domain


def new_browser():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('--no-sandbox')
    browser = webdriver.Chrome(
        executable_path=chromedriver, options=options)
    return browser


def get_image(name, href, domain):
    browser = new_browser()
    if domain == 'i.redd.it':
        browser.get(f"https://old.reddit.com/{href}")
        reddit_page = BeautifulSoup(
            browser.page_source, features="html.parser")
        reddit_link = reddit_page.find(
            'div', class_="media-preview-content").find('a')['href']
        browser.get(reddit_link)
        reddit_name = f"{name}.{reddit_link.split('.')[len(reddit_link.split('.')) - 1]}"
        open(reddit_name, 'wb').write(requests.get(reddit_link).content)
        print(f"Downloaded {reddit_name}")
    elif domain == 'imgur.com':
        browser.get(href)
        imgur_page = BeautifulSoup(browser.page_source, features="html.parser")
        imgur_link = imgur_page.find('a', class_="zoom")["href"]
        imgur_name = f"{name}.{imgur_link.split('.')[len(imgur_link.split('.')) - 1]}"
        open(imgur_name, 'wb').write(requests.get(imgur_link).content)
        print(f"Downloaded {imgur_name}")
    elif domain == 'i.imgur.com':
        i_imgur_link = f"https:{href}"
        browser.get(i_imgur_link)
        i_imgur_name = f"{name}.{i_imgur_link.split('.')[len(i_imgur_link.split('.')) - 1]}"
        open(i_imgur_name, 'wb').write(requests.get(i_imgur_link).content)
        print(f"Downloaded {i_imgur_name}")


def check_duplicates(images_list):
    current_files = []
    for i in os.listdir():
        current_files.append(i.split('.')[0])
    for image in images_list:
        if image.name in current_files:
            images_list.remove(image)
        else:
            get_image(image.name, image.href, image.domain)


def get_posts(rawpage):
    images = []
    subreddit = BeautifulSoup(rawpage.page_source, features="html.parser")
    for post in subreddit.find_all('div', class_="thing"):
        name = post.find('a', class_="title").text.replace('/', ' ')
        href = post.find('a', class_="title")['href']
        domain = post.find('span', class_="domain").find('a').text
        ads = [True if post.find('span', class_="promoted-span") else False,
               True if post.find('span', class_="stickied-tagline") else False]
        if True not in ads:
            images.append(Image(name, href, domain))
    return images


if (ARG_COUNT != 3):
    print('-------------------------------------------')
    print('You must pass 2 arguments into this script.')
    print('-------------------------------------------')

elif (ARG_COUNT == 3):
    browser = new_browser()
    browser.get(URL)
    image_posts = get_posts(browser)
    check_duplicates(image_posts)
