import os
import shutil
from docx2pdf import convert

input_folder = "./public/fileraw/"
output_folder = "./public/converted/"

for filename in os.listdir(input_folder):
    filepath = os.path.join(input_folder, filename)

    if filename.lower().endswith(".docx"):
        convert(filepath, output_folder)
    else:
        shutil.copy(filepath, os.path.join(output_folder, filename))