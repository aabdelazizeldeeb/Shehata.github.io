import os
import glob
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('png', 'jpg', 'jpeg', 'heic', 'heif')):
                file_path = os.path.join(root, file)
                try:
                    # Open the image
                    img = Image.open(file_path)
                    
                    # Convert to RGB if it's RGBA or P to avoid issues with JPEG/WEBP
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Create the new filename
                    base_name = os.path.splitext(file)[0]
                    new_file_path = os.path.join(root, base_name + '.webp')
                    
                    # Save as WebP
                    img.save(new_file_path, 'webp', quality=85)
                    print(f"Converted: {file_path} -> {new_file_path}")
                    
                    # Remove the original file
                    os.remove(file_path)
                except Exception as e:
                    print(f"Failed to convert {file_path}: {e}")

if __name__ == "__main__":
    images_dir = r"c:\Users\Ahmed Abdelaziz\Desktop\Shehata\public\assets\images"
    convert_to_webp(images_dir)
