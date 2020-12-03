FROM openjdk:8
ADD target/expense-tracker.jar expense-tracker.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "expense-tracker.jar"]