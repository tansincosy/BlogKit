---
title: 通过 github action 自动发布博客
toc: true
thumbnail: 'https://imgur.com/XZMk3Po.png'
abstract: 使用github action 发布hexo 博客
categories:
  - 笔记
date: 2019-11-13 22:09:22
tags:
---


# 前言

本博客原来的自动化是通过travis 来完成自动发布，由于github 发布了action 所以将采用github的CI 来进行博客的发布。
<!-- more -->

## 如何使用
1. 在所有的工作开始之前，我们生成部署公私钥

`ssh-keygen -t rsa -b 4096 -C "charlesmaxwellyoung@gmail.com" -f ~/.ssh/github-actions-deploy`

2. 在`~/.ssh`目录中找到刚刚生成的包含**github-actions-deploy**文件 ![Imgur](https://imgur.com/dLFwEoo.png)

   > 其中的pub是公钥，放置在  Github Pages 的仓库，**Settings -> Deploy keys** 添加刚刚生成的公钥，名称随意，但要勾选 **Allow write access**。
   >
   > 另外一个是私钥，放置在新仓库的 **Settings -> Secrets** 里添加刚刚生成的私钥，名称为 `BLOG_ACTION`。

   3. 编写workflow，文件位置`.github/workflows/deploy.yml`

      ```yaml
      name: build and auto publish github pages
      on: [push]
      jobs:
        builds:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              node-version: [10.x]
      
          steps:
            - uses: actions/checkout@v1
            - name: begin setup node
              uses: actions/setup-node@v1
              with:
                node-version: "10.x"
      
            - name: setup hexo env
              env:
                ACTION_DEPLOY_KEY: ${{secrets.BLOG_ACTION}}
              run: |
                mkdir -p ~/.ssh/
                echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
                chmod 600 ~/.ssh/id_rsa
                ssh-keyscan github.com >> ~/.ssh/known_hosts
                git config --global user.name 'yy921010'
                git config --global user.email 'charlesmaxwellyoung@gmail.com'
                npm i -g hexo-cli
                npm i
            - name: blog publish
              run: |
                hexo g -d
      ```

   4. push 上去，然后进入action 选项，观察状态。