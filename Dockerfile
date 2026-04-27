FROM nginx:alpine

# Copy the static website files to the nginx html directory
COPY . /usr/share/nginx/html

# Update nginx to listen on port 8080 (Cloud Run's default expected port)
RUN sed -i 's/listen  *[0-9]*/listen 8080/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
