from app.ai.extractor import PDFExtractor

extractor = PDFExtractor()

text = extractor.extract_text(
    "uploads/a741306e-3d4a-4e23-8cbc-7ee1000b1999.pdf"
)

print(text)