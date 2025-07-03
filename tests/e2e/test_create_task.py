import unittest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from utils.setup import init_driver

class TestCreateTask(unittest.TestCase):
    def test_create_task(self):
        driver = init_driver()
        try:
            driver.get("http://localhost:3000")

            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Nouvelle Tâche')]"))
            ).click()

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.NAME, "title"))
            ).send_keys("Tâche Selenium")

            driver.find_element(By.NAME, "description").send_keys("Créée automatiquement")
            driver.find_element(By.NAME, "priority").send_keys("high") 
            driver.find_element(By.NAME, "assignedTo").send_keys("")

            driver.find_element(By.CSS_SELECTOR, ".form-actions .btn-primary").click()

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "task-title"))
            )

            tasks = driver.find_elements(By.CLASS_NAME, "task-title")
            self.assertTrue(
                any("Tâche Selenium" in task.text for task in tasks),
                "La tâche n'a pas été trouvée dans la liste après création."
            )

        finally:
            driver.quit()
