# 使用Node.js官方镜像作为基础镜像，选择合适的版本，这里以18为例
FROM timbru31/node-chrome

# 设置工作目录
WORKDIR /app

# # 创建用户和组，并设置uid和gid为1000
# RUN useradd -u 1001 -g root -m -d /app/home/ -s /bin/bash uf

# # 设置uf用户对/app/home目录及其子目录和文件可读可写的权限
# RUN chown -R uf:root /app/home && chmod -R u+rwX,g+rwX,o+rX /app/home

# RUN su uf

# 更新软件包列表
RUN apt-get update && apt-get install -y fonts-noto-cjk 

# 复制项目的package.json和package-lock.json文件到工作目录
COPY package*.json ./

# vitepress-export-pdf 依赖安装
# RUN npm run export:install

# 安装项目依赖，包括puppeteer等
RUN npm install 

RUN npm install -g pm2

# 复制项目的所有源代码到工作目录
COPY . .

# 暴露服务器监听的端口，这里是3000端口
# webhooks
EXPOSE 3020 
# 导出接口
EXPOSE 3030
# 文档服务
EXPOSE 3040

RUN npm run docs:build

# RUN npm run export:api:install
# RUN npm run webhooks:install
# RUN npm run export:install


# 导出pdf文件
RUN npm run export:en 
RUN npm run export:cn

# 定义容器启动时要执行的命令，启动Express服务器 & npm run export:api & npm run webhooks
CMD ["bash", "-c", "npm run docs:preview & npm run export:api & npm run webhooks"]