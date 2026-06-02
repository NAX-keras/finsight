# Gunakan base image Python yang stabil
FROM python:3.11-slim

# Set working directory di dalam container
WORKDIR /code

# Copy file requirements terlebih dahulu agar proses build lebih cepat (caching)
COPY ./requirements.txt /code/requirements.txt

# Install semua library Python (termasuk library AI kamu yang berat)
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy seluruh isi folder backend ke dalam container
COPY . /code

# PENTING: Hugging Face Spaces WAJIB berjalan di port 7860
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]