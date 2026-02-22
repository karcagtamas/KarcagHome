plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.serialization)
    alias(libs.plugins.ktor)
    application
    id("project.common")
}

dependencies {
    implementation(project(":shared"))
    implementation(libs.bundles.ktor)
    implementation(libs.logback.classic)
    implementation(libs.mongodb.coroutine.driver)

    testImplementation(kotlin("test"))
    testImplementation(libs.junit.api)
    testRuntimeOnly(libs.junit.engine)
}

application {
    mainClass.set("MainKt")
}

tasks.withType<JavaExec> {
    jvmArgs("--enable-native-access=ALL-UNNAMED")
}

tasks.test {
    useJUnitPlatform()
}