## Running Puppeteer in node.js with Amazon Linux 2023

Solving problem: /home/webapp/.cache/puppeteer/chrome/linux-123.0.6312.122/chrome-linux64/chrome: error while loading shared libraries: libatk-1.0.so.0: cannot open shared object file: No such file or directory

### Original error (Linux machine can't find):

![1714263220863](images/README/1714263220863.png)

### After installing Chrome using dnf

```docker
RUN dnf install -y https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

```

![1714263373632](images/README/1714263373632.png)

#### Looks like it cant access to chrome using this distro, so we add the --no-sandbox flag into the args in puppeteer

```javascript
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

```

### After doing this you should see:

![1714263507505](images/README/1714263507505.png)

### Finally generating the file without problems
