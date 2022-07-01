---
layout: post
title: "java类读取properties"
thumbnail: https://i.imgur.com/1yLFPcB.png
abstract: Java读取properties文件数据
toc: true
tags:
  - JAVA
  - properties
  - JAVA
  - properties
  - JAVA
  - properties
  - JAVA
  - properties
  - JAVA
  - properties
categories:
  - 后端
---

# 前言

通过@value 读取 properties 注意点

<!-- more -->

- applicationContext 文件读取文件需要配置成为多文件读取方式

  ```xml
  <bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
          <property name="locations">
              <list>
                  <!-- jdbc配置 -->
                  <value>classpath:config/jdbc.properties</value>
                  <!-- 通用配置 -->
                  <value>classpath:config/appConfig.properties</value>
              </list>
          </property>
      </bean>

  ```

- 需要将 java 配置到 service.impl 中，就是需要 spring service 层级能够扫描到

  ```java
  @Component("commonConfig")
  public class CommonConfig {

      @Value("${config.isaKey}")
      private String isaKey;

      @Value("${config.doubankey}")
      private String doubanKey;

      @Value("${config.juheKey}")
      private String juheKey;

      @Value("${config.oneUuid}")
      private String oneUuid;

      public String getIsaKey() {
          return isaKey;
      }

      public String getDoubanKey() {
          return doubanKey;
      }

      public String getJuheKey() {
          return juheKey;
      }

      public String getOneUuid() {
          return oneUuid;
      }
  }
  ```
