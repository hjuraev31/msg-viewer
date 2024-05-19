import os
import uuid

def generate_unique_folder(directory):
    while True:
        unique_id = uuid.uuid4()
        folder_name = f"{unique_id}"
        full_path = os.path.join(directory, folder_name)
        if not os.path.exists(full_path):
            try:
                os.makedirs(full_path)
                print(f"Directory '{full_path}' created successfully")
                return full_path
            except OSError as e:
                print(f"Error creating directory '{full_path}': {e}")
                return None

