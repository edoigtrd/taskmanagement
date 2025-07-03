from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def init_driver():
    options = Options()
    options.add_argument("--headless")  # pour exécuter sans UI (dans CI)
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(5)
    return driver
