import org.gradle.api.Plugin
import org.gradle.api.Project
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

class KotlinCommonConvention : Plugin<Project> {
    override fun apply(target: Project) = with(target) {
        //pluginManager.apply("org.jlleitschuh.gradle.ktlint")
        //pluginManager.apply("io.gitlab.arturbosch.detekt")

        tasks.withType(KotlinCompile::class.java).configureEach {
            compilerOptions.jvmTarget.set(JvmTarget.JVM_24)
        }
    }
}