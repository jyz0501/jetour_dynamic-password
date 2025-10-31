import requests
import os
from tenacity import retry, stop_after_attempt


def upload_image(cookie, image_path):
    url = "https://open.douyin.com/video/upload/"
    headers = {
        "Authorization": f"Bearer {cookie}",
        "Content-Type": "multipart/form-data"
    }
    files = {"image": open(image_path, "rb")}
    
    response = requests.post(url, headers=headers, files=files)
    return response.json()
@retry(stop=stop_after_attempt(3))
def upload_image(cookie, image_path):
    # 上传逻辑
if __name__ == "__main__":
    # 从 GitHub Secrets 读取 Cookie
    COOKIE = os.environ["DOUYIN_COOKIE"]
    IMAGE_PATH = "screenshot.png"
    
    result = upload_image(COOKIE, IMAGE_PATH)
    print(result)
