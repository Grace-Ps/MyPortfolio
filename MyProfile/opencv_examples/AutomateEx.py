import pyautogui
import time

# # Open Notepad
# pyautogui.press('win')
# time.sleep(1)
# pyautogui.typewrite('Notepad')
# pyautogui.press('enter')
# time.sleep(1)
#
# # Write text in Notepad
# pyautogui.write("The text is written in Notepad using pyautogui.")



# pyautogui.press('win')
# time.sleep(1)
# pyautogui.typewrite('edge')
# pyautogui.press('enter')
# time.sleep(2)
# # pyautogui.click(x=400, y=400)
# pyautogui.typewrite("https://www.google.com")
# pyautogui.press('enter')
# time.sleep(2)
# # Write text in the search bar
# pyautogui.typewrite("python")
# pyautogui.press('enter')
# time.sleep(1)


# pyautogui.press('win')
# pyautogui.typewrite('Edge')
# pyautogui.press('enter')
# time.sleep(2)
# pyautogui.typewrite('https://www.geeksforgeeks.org')
# pyautogui.press('enter')


pyautogui.press('win')
pyautogui.typewrite('Paint')
pyautogui.press('enter')
time.sleep(5)
pyautogui.press('enter')
pyautogui.moveTo(700, 400, duration=1)
pyautogui.dragTo(700,600, duration=1)
pyautogui.dragTo(600,600, duration=1)
pyautogui.dragTo(600,400, duration=1)



time.sleep(1)