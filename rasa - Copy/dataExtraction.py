import pdfplumber

def extract_pdf_data(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ''
        for page in pdf.pages:
            full_text += page.extract_text()
    return full_text

pdf_path = "rasa\Instru-Structure and Assessment Scheme -AY 23-24-22.06.23.pdf"
extracted_text = extract_pdf_data(pdf_path)
print(extracted_text)
