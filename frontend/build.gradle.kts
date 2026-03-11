import com.github.gradle.node.npm.task.NpmTask

plugins {
    alias(libs.plugins.node)
}

node {
    download.set(true)
    version.set("24.14.0")
}

val buildTask = tasks.named<NpmTask>("npm_run_build") {
    inputs.dir("src")
    inputs.file("package.json")
    outputs.dir("dist")
}

tasks.register<Copy>("copyToBackend") {
    dependsOn(buildTask)
    from("dist")
    into("${project(":backend").projectDir}/src/main/resources/static")
}