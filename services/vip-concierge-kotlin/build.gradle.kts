plugins {
    kotlin("jvm") version "1.9.23"
    application
}

group = "com.clothyyy"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core:2.3.9")
    implementation("io.ktor:ktor-server-netty:2.3.9")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.9")
    implementation("io.ktor:ktor-serialization-gson:2.3.9")
    implementation("io.ktor:ktor-server-cors:2.3.9")
    implementation("ch.qos.logback:logback-classic:1.4.14")
}

application {
    mainClass.set("com.clothyyy.concierge.ApplicationKt")
}
