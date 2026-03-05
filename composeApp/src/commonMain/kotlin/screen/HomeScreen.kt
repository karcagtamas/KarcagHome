package screen

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.Analytics
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.material.icons.rounded.Home
import androidx.compose.material.icons.rounded.Monitor
import androidx.compose.material.icons.rounded.Savings
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import cafe.adriel.voyager.core.screen.Screen
import cafe.adriel.voyager.navigator.LocalNavigator
import cafe.adriel.voyager.navigator.currentOrThrow
import components.FeatureTile

class HomeScreen : Screen {

    @OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
    @Composable
    override fun Content() {
        val navigator = LocalNavigator.currentOrThrow

        Scaffold(
            topBar = {
                TopAppBar(title = { Text("Main Dashboard") })
            }
        ) { padding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding),
                contentAlignment = Alignment.Center,
            ) {
                FlowRow(
                    modifier = Modifier
                        .wrapContentSize(),
                    horizontalArrangement = Arrangement.spacedBy(24.dp, Alignment.CenterHorizontally),
                    verticalArrangement = Arrangement.spacedBy(24.dp),
                    maxItemsInEachRow = 2,
                ) {
                    FeatureTile(
                        "Measurements",
                        "Data tracking",
                        Icons.Rounded.Monitor,
                    ) { /* navigator.push(...) */ }

                    FeatureTile("SmartHome", "IoT Control", Icons.Rounded.Home) { /* navigator.push(...) */ }

                    FeatureTile(
                        "MoneyLens",
                        "Finance",
                        Icons.Rounded.Savings,
                    ) { /* navigator.push(...) */ }
                }
            }
        }
    }
}