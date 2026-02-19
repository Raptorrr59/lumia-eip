FROM amazoncorretto:21 AS builder

WORKDIR /app

COPY demo/ /app/

RUN yum install -y tar gzip

RUN chmod +x mvnw

RUN ./mvnw clean package

FROM amazoncorretto:21

WORKDIR /app

COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8000

ENTRYPOINT ["java", "-jar", "app.jar"]
