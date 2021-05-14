FROM openjdk:8-jdk-alpine
VOLUME /home/ubuntu/share/nginx/html:/home/image
ADD ./target/dayugi-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"] 
