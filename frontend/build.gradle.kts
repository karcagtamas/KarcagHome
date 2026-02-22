plugins {
    alias(libs.plugins.kotlin.multiplatform)
    id("project.common")
}

kotlin {
    js(IR) {
        browser()
    }

    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(libs.react)
                implementation(libs.react.dom)
            }
        }
    }
}