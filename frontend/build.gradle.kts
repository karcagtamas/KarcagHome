plugins {
    alias(libs.plugins.kotlin.multiplatform)
    id("project.common")
}

kotlin {
    js(IR) {
        browser {
            commonWebpackConfig {
                cssSupport {
                    enabled = true
                }

                devServer = devServer?.copy(
                    port = 5000,
                    open = true,
                )
            }
        }
        binaries.executable()
    }

    sourceSets {
        val jsMain by getting {
            dependencies {
                implementation(project(":shared"))
                implementation(libs.react)
                implementation(libs.react.dom)
                implementation(libs.emotion)
            }
        }
    }
}