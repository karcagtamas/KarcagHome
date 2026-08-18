package dto.expenses

import kotlinx.serialization.Serializable

@Serializable
data class AccountSummaryDTO(
    val total: Double,
    val categories: List<AccountSummaryCategoryDTO>,
    val categoryTypes: List<AccountSummaryCategoryTypeDTO>,
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