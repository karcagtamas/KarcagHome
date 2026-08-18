package dto.expenses

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class AccountSummaryDTO(
    val total: Double,
    val categories: List<AccountSummaryCategoryDTO>,
    val categoryTypes: List<AccountSummaryCategoryTypeDTO>,
    val expenses: List<AccountSummaryExpenseDTO>,
)

@Serializable
data class AccountSummaryCategoryDTO(
    val category: ExpenseCategoryDTO,
    val amount: Double,
)

@Serializable
data class AccountSummaryCategoryTypeDTO(
    val categoryType: ExpenseCategoryTypeDTO,
    val amount: Double,
)

@Serializable
data class AccountSummaryExpenseDTO(
    val date: LocalDate,
    val amount: Double,
)