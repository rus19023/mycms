import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
import csv
import datetime
import time

import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

URL = "https://www.amazon.com/Sony-PlayStation-Pro-1TB-Console-4/dp/B07K14XKZH/"
webpage = requests.get(URL, headers=HEADERS)

soup = BeautifulSoup(webpage.content, "lxml")

# Outer Tag Object
title = soup.find("span", attrs={"id":'productTitle'})

# Inner NavigableString Object
title_value = title.string

# Title as a string value
title_string = title_value.strip()

# Printing types of values for efficient understanding
print(type(title))
print(type(title_value))
print(type(title_string))
print()

# Printing Product Title
print("Product Title = ", title_string)



# class AmazonOrderScraper:

#     def __init__(self):
#         self.date = np.array([])
#         self.cost = np.array([])
#         self.order_id = np.array([])

#     def URL(self, year: int, start_index: int) -> str:
#         return "https://www.amazon.co.uk/gp/your-account/order-history/" + \
#                 "ref=ppx_yo_dt_b_pagination_1_4?ie=UTF8&orderFilter=year-" + \
#                 str(year) + \
#                 "&search=&startIndex=" + \
#                 str(start_index)

#     def scrape_order_data(self, start_year: int, end_year: int) -> pd.DataFrame:
#         years = list(range(start_year, end_year + 1))
#         driver = self.start_driver_and_manually_login_to_amazon()

#         for year in years:
#             driver.get(
#                 self.URL(year, 0)
#             )

#             number_of_pages = self.find_max_number_of_pages(driver)

#             self.scrape_first_page_before_progressing(driver)

#             for i in range(number_of_pages):
#                 self.scrape_page(driver, year, i)

#             print(f"Order data extracted for { year }")

#         driver.close()

#         print("Scraping done :)")

#         order_data = pd.DataFrame({
#             "Date": self.date,
#             "Cost £": self.cost,
#             "Order ID": self.order_id
#         })

#         order_data = self.prepare_dataset(order_data)

#         order_data.to_csv(r"amazon-orders.csv")

#         return order_data


#     def start_driver_and_manually_login_to_amazon(self) -> webdriver:
#         options = webdriver.ChromeOptions()
#         options.add_argument("--start-maximized")

#         driver = webdriver.Chrome("chromedriver.exe", options=options)
#         amazon_sign_in_url = "https://www.amazon.co.uk/ap/signin?" + \
#             "_encoding=UTF8&accountStatusPolicy=P1&" + \
#             "openid.assoc_handle=gbflex&openid.claimed_id" + \
#             "=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&" + \
#             "openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier" + \
#             "_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid" + \
#             ".net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net" + \
#             "%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid" + \
#             ".return_to=https%3A%2F%2Fwww.amazon.co.uk%2Fgp%2Fcss%2Forder-history" + \
#             "%3Fie%3DUTF8%26ref_%3Dnav_orders_first&" + \
#             "pageId=webcs-yourorder&showRmrMe=1"

#         driver.get(amazon_sign_in_url)
#         time.sleep(30) # allows time for manual sign in - increase if you need more time

#         return driver

#     def find_max_number_of_pages(self, driver: webdriver) -> int:
#         time.sleep(2)
#         page_source = driver.page_source
#         page_content = BeautifulSoup(page_source, "html.parser")

#         a_normal = page_content.findAll("li", {"class": "a-normal"})
#         a_selected = page_content.findAll("li", {"class": "a-selected"})
#         max_pages = len(a_normal + a_selected) - 1


#         return max_pages

#     def scrape_first_page_before_progressing(self, driver: webdriver) -> None:
#         time.sleep(2)
#         page_source = driver.page_source
#         page_content = BeautifulSoup(page_source, "html.parser")
#         order_info = page_content.findAll("span", {"class": "a-color-secondary value"})

#         orders = []
#         for i in order_info:
#             orders.append(i.text.strip())

#         index = 0
#         for i in orders:
#             if index == 0:
#                 self.date = np.append(self.date, i)
#                 index += 1
#             elif index == 1:
#                 self.cost = np.append(self.cost, i)
#                 index += 1
#             elif index == 2:
#                 self.order_id = np.append(self.order_id, i)
#                 index = 0

#     def scrape_page(self, driver: webdriver, year: int, i: int) -> None:
#         start_index = list(range(10, 110, 10))

#         driver.get(
#             self.URL(year, start_index[i])
#         )
#         time.sleep(2)

#         data = driver.page_source
#         page_content = BeautifulSoup(data, "html.parser")

#         order_info = page_content.findAll("span", {"class": "a-color-secondary value"})

#         orders = []
#         for i in order_info:
#             orders.append(i.text.strip())

#         index = 0
#         for i in orders:
#             if index == 0:
#                 self.date = np.append(self.date, i)
#                 index += 1
#             elif index == 1:
#                 self.cost = np.append(self.cost, i)
#                 index += 1
#             elif index == 2:
#                 self.order_id = np.append(self.order_id, i)
#                 index = 0

#     def prepare_dataset(self, order_data: pd.DataFrame) -> pd.DataFrame:
#         order_data.set_index("Order ID", inplace=True)

#         order_data["Cost $"] = order_data["Cost $"].str.replace("$", "").astype(float)
#         order_data['Order Date'] = pd.to_datetime(order_data['Date'])
#         order_data["Year"] = pd.DatetimeIndex(order_data['Order Date']).year
#         order_data['Month Number'] = pd.DatetimeIndex(order_data['Order Date']).month
#         order_data['Day'] = pd.DatetimeIndex(order_data['Order Date']).dayofweek

#         day_of_week = {
#             0:'Monday',
#             1:'Tuesday',
#             2:'Wednesday',
#             3:'Thursday',
#             4:'Friday',
#             5:'Saturday',
#             6:'Sunday'
#         }

#         order_data["Day Of Week"] = order_data['Order Date'].dt.dayofweek.map(day_of_week)

#         month = {
#             1:'January',
#             2:'February',
#             3:'March',
#             4:'April',
#             5:'May',
#             6:'June',
#             7:'July',
#             8:'August',
#             9:'September',
#             10:'October',
#             11:'November',
#             12:'December'
#         }

#         order_data["Month"] = order_data['Order Date'].dt.month.map(month)

#         return order_data


# if __name__ == "__main__":
#     aos = AmazonOrderScraper()
#     order_data = aos.scrape_order_data(start_year = 2010, end_year = 2021)
#     print(order_data.head(3))
