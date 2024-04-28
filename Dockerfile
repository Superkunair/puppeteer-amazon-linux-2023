# Pull amazonlinux image
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# Install
# Update the system and install the packages
RUN dnf install -y https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
RUN dnf install -y nodejs
# Copy Project
COPY package.json .
COPY package-lock.json .
COPY main.js .
COPY check.sh .

# Install node
RUN echo Node version:
RUN node -v 
RUN npm install

# Run
ENTRYPOINT npm start
